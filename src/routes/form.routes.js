const express = require('express')
const formRouter = express.Router()
const auth = require('../middleware/auth')
const formController = require('../controllers/form.controller')

formRouter.get('/', formController.getAllForms)
formRouter.get('/:formId', formController.getOneForm)
formRouter.post('/find', formController.findForm)
formRouter.post('/', auth, formController.createNewForm)
formRouter.put('/:formId', auth, formController.updateOneForm)

module.exports = formRouter
