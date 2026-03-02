'use strict'

const ProductService = require('../services/ProductService')

async function index(req, res) {
    const products = await ProductService.listProducts()
    return res.json(products)
}

module.exports = { index }
