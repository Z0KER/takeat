'use strict'

require('dotenv').config()

const app = require('./app')
const { sequelize } = require('../models')

const PORT = process.env.PORT || 3000

async function start() {
    try {
        await sequelize.authenticate()
        console.log('✅ Banco de dados conectado com sucesso.')

        app.listen(PORT, () => {
            console.log(`🚀 Servidor rodando em http://localhost:${PORT}`)
        })
    } catch (error) {
        console.error(
            '❌ Falha ao conectar com o banco de dados:',
            error.message,
        )
        process.exit(1)
    }
}

start()
