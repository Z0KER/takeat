'use strict'

const OrderService = require('../services/OrderService')

async function create(req, res) {
    const { items } = req.body

    if (!Array.isArray(items) || items.length === 0) {
        return res.status(400).json({
            error: 'ValidationError',
            message:
                'O corpo da requisição deve conter um array "items" com ao menos um item.',
        })
    }

    for (const item of items) {
        if (!item.productId || !Number.isInteger(item.productId)) {
            return res.status(400).json({
                error: 'ValidationError',
                message: 'Cada item deve ter um "productId" numérico inteiro.',
            })
        }
        if (
            !item.quantity ||
            !Number.isInteger(item.quantity) ||
            item.quantity < 1
        ) {
            return res.status(400).json({
                error: 'ValidationError',
                message:
                    'Cada item deve ter um "quantity" inteiro maior que zero.',
            })
        }
    }

    const order = await OrderService.createOrder(items)
    return res.status(201).json(order)
}

async function index(req, res) {
    const orders = await OrderService.listOrders()
    return res.json(orders)
}

module.exports = { create, index }
