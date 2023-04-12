const express = require('express')
const userRouter = express.Router()
const auth = require('../middleware/auth')
const userController = require('../controllers/user.controller')

userRouter.get('/', auth, userController.getAllUsers)
userRouter.post('/', userController.createUser)
userRouter.post('/update-password', userController.updatePassword)

module.exports = userRouter
