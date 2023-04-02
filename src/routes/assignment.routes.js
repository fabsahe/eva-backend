const express = require('express')
const assignmentRouter = express.Router()

const assignmentController = require('../controllers/assignment.controller')

assignmentRouter.get('/:careerId', assignmentController.getAssignments)
assignmentRouter.get('/professors/:group', assignmentController.getProfessors)

module.exports = assignmentRouter
