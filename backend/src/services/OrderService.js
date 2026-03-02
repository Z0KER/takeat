'use strict'

const {
    sequelize,
    Product,
    Input,
    ProductInput,
    Order,
    OrderItem,
} = require('../../models')
const StockError = require('../errors/StockError')

async function createOrder(items) {
    const productIds = items.map(i => i.productId)

    const products = await Product.findAll({
        where: { id: productIds },
        include: [
            {
                model: ProductInput,
                as: 'productInputs',
                include: [{ model: Input, as: 'input' }],
            },
        ],
    })

    // Verificando se todos os produtos existem
    if (products.length !== productIds.length) {
        const foundIds = products.map(p => p.id)
        const missing = productIds.filter(id => !foundIds.includes(id))
        const err = new Error(`Produtos não encontrados: ${missing.join(', ')}`)
        err.statusCode = 404
        throw err
    }

    // Setando o consumo total de insumos
    const consumoMap = new Map()

    for (const item of items) {
        const product = products.find(p => p.id === item.productId)

        for (const pi of product.productInputs) {
            const totalForThisItem = pi.quantity * item.quantity
            const inputId = pi.inputId

            if (consumoMap.has(inputId)) {
                consumoMap.get(inputId).totalRequired += totalForThisItem
            } else {
                consumoMap.set(inputId, {
                    inputName: pi.input.name,
                    totalRequired: totalForThisItem,
                })
            }
        }
    }

    // Transação com SELECT FOR UPDATE para evitar race condition
    const order = await sequelize.transaction(async t => {
        const insufficientInputs = []

        // Valida e decrementa cada insumo (com row lock)
        for (const [
            inputId,
            { inputName, totalRequired },
        ] of consumoMap.entries()) {
            const input = await Input.findByPk(inputId, {
                transaction: t,
                lock: t.LOCK.UPDATE,
            })

            if (input.stock < totalRequired) {
                insufficientInputs.push({
                    inputId,
                    inputName,
                    required: totalRequired,
                    available: input.stock,
                })
            }
        }

        if (insufficientInputs.length > 0) {
            throw new StockError(insufficientInputs)
        }

        // Decrementa o estoque de cada insumo
        for (const [inputId, { totalRequired }] of consumoMap.entries()) {
            await Input.decrement('stock', {
                by: totalRequired,
                where: { id: inputId },
                transaction: t,
            })
        }

        const total = items.reduce((sum, item) => {
            const product = products.find(p => p.id === item.productId)
            return sum + parseFloat(product.price) * item.quantity
        }, 0)

        // Criando o Order
        const newOrder = await Order.create(
            { status: 'confirmed', total },
            { transaction: t },
        )

        // Criando os OrderItems
        const orderItemsData = items.map(item => {
            const product = products.find(p => p.id === item.productId)
            return {
                orderId: newOrder.id,
                productId: item.productId,
                quantity: item.quantity,
                unitPrice: parseFloat(product.price),
            }
        })

        await OrderItem.bulkCreate(orderItemsData, { transaction: t })

        return newOrder
    })

    // Retornando o pedido com itens
    return Order.findByPk(order.id, {
        include: [
            {
                model: OrderItem,
                as: 'items',
                include: [
                    {
                        model: Product,
                        as: 'product',
                        attributes: ['id', 'name', 'price'],
                    },
                ],
            },
        ],
    })
}

async function listOrders() {
    return Order.findAll({
        order: [['createdAt', 'DESC']],
        include: [
            {
                model: OrderItem,
                as: 'items',
                include: [
                    {
                        model: Product,
                        as: 'product',
                        attributes: ['id', 'name', 'price'],
                    },
                ],
            },
        ],
    })
}

module.exports = { createOrder, listOrders }
