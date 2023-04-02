const express = require('express')
const authRouter = express.Router()

const authController = require('../controllers/auth.controller')

authRouter.post('/', authController.login)

module.exports = authRouter
