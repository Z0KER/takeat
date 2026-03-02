'use strict'

const { Router } = require('express')
const OrderController = require('../controllers/OrderController')

const router = Router()

// POST
router.post('/', OrderController.create)

// GET
router.get('/', OrderController.index)

module.exports = router
