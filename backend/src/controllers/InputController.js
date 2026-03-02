'use strict'

const InputService = require('../services/InputService')

async function index(req, res) {
    const inputs = await InputService.listInputs()
    return res.json(inputs)
}

module.exports = { index }
