'use strict'

const { Product, ProductInput, Input } = require('../../models')

async function listProducts() {
    return Product.findAll({
        order: [['name', 'ASC']],
        include: [
            {
                model: ProductInput,
                as: 'productInputs',
                include: [
                    {
                        model: Input,
                        as: 'input',
                        attributes: ['id', 'name', 'unit', 'stock'],
                    },
                ],
            },
        ],
    })
}

module.exports = { listProducts }
