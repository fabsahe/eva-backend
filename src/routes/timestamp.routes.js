const express = require('express')
const timestampRouter = express.Router()
const timestampController = require('../controllers/timestamp.controller')

timestampRouter.get('/', timestampController.getTimestamps)

module.exports = timestampRouter
