'use strict'

const { Router } = require('express')
const InputController = require('../controllers/InputController')

const router = Router()

// GET
router.get('/', InputController.index)

module.exports = router
