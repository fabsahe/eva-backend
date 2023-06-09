const express = require('express')
const answerRouter = express.Router()
const answerController = require('../controllers/answer.controller')

answerRouter.get('/:formId', answerController.getFormAnswers)
answerRouter.post('/', answerController.createNewAnswers)

module.exports = answerRouter
