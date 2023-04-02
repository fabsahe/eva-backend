const express = require('express')
const periodRouter = express.Router()

const periodController = require('../controllers/period.controller')

periodRouter.get('/', periodController.getAllPeriods)

module.exports = periodRouter
