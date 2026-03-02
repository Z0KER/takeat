'use strict'

require('dotenv').config()
require('express-async-errors')

const express = require('express')
const cors = require('cors')

const productRoutes = require('./routes/products.routes')
const inputRoutes = require('./routes/inputs.routes')
const orderRoutes = require('./routes/orders.routes')
const errorHandler = require('./middlewares/errorHandler')

const app = express()

app.use(cors())
app.use(express.json())

// Routes
app.use('/products', productRoutes)
app.use('/inputs', inputRoutes)
app.use('/orders', orderRoutes)

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

app.use(errorHandler)

module.exports = app
