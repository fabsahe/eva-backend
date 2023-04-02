const express = require('express')
const careerRouter = express.Router()

const careerController = require('../controllers/career.controller')

careerRouter.get('/', careerController.getCareers)

module.exports = careerRouter
