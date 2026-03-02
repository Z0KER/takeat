'use strict'

const { Router } = require('express')
const ProductController = require('../controllers/ProductController')

const router = Router()

// GET
router.get('/', ProductController.index)

module.exports = router
