const express = require('express')
const professorRouter = express.Router()

const professorController = require('../controllers/professor.controller')

professorRouter.get('/', professorController.getAllProfessors)
professorRouter.get('/:group', professorController.getProfessors)

module.exports = professorRouter
