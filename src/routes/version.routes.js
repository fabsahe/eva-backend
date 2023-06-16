const express = require('express')
const versionRouter = express.Router()

const versionController = require('../controllers/version.controller')

versionRouter.get('/', versionController.getVersion)

module.exports = versionRouter
