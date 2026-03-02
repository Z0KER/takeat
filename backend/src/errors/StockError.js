'use strict'

class StockError extends Error {
    constructor(insufficientInputs) {
        super('Estoque insuficiente para um ou mais ingredientes do pedido.')
        this.name = 'StockError'
        this.statusCode = 409
        this.details = insufficientInputs.map(item => ({
            inputId: item.inputId,
            inputName: item.inputName,
            required: item.required,
            available: item.available,
        }))
    }
}

module.exports = StockError
