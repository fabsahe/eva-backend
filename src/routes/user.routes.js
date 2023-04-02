const express = require('express')
const userRouter = express.Router()

const userController = require('../controllers/user.controller')

userRouter.get('/', userController.getAllUsers)
userRouter.post('/', userController.createUser)

module.exports = userRouter
