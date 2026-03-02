'use strict'

const { Input } = require('../../models')

async function listInputs() {
    return Input.findAll({ order: [['name', 'ASC']] })
}

module.exports = { listInputs }
