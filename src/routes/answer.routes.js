const express = require('express')
const answerRouter = express.Router()
const answerController = require('../controllers/answer.controller')

answerRouter.get('/:formId', answerController.getAnswersForm)
answerRouter.post('/', answerController.createNewAnswer)

module.exports = answerRouter
