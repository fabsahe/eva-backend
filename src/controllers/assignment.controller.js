const assignmentService = require('../services/assignment.service')
const consola = require('consola')

const getAllAssignments = async (req, res, next) => {
  try {
    const { professor } = req.query
    const groups = await assignmentService.getAssignments({ professor })
    res.send({
      status: 'OK',
      data: groups,
      message: 'Grupos obtenidos'
    })
  } catch (error) {
    consola.error(error)
    res
      .status(error?.status || 500)
      .send({ status: 'FAILED', data: { error: error?.message || error } })
  }
}

const getAssignments = async (req, res, next) => {
  const { careerId } = req.params
  const { year, period } = req.query
  try {
    const assignments = await assignmentService.getAssignments({
      carrera: careerId,
      año: year,
      periodo: period
    })
    res.send({
      status: 'OK',
      data: assignments,
      message: 'Grupos obtenidos'
    })
  } catch (error) {
    consola.error(error)
    res
      .status(error?.status || 500)
      .send({ status: 'FAILED', data: { error: error?.message || error } })
  }
}

const getProfessors = async (req, res, next) => {
  const { group } = req.params
  const { year, period } = req.query
  try {
    const professors = await assignmentService.getProfessors({
      grupo: group,
      año: year,
      periodo: period
    })
    res.send({
      status: 'OK',
      data: professors,
      message: 'Profesores obtenidos'
    })
  } catch (error) {
    consola.error(error)
    res
      .status(error?.status || 500)
      .send({ status: 'FAILED', data: { error: error?.message || error } })
  }
}

module.exports = {
  getAllAssignments, getAssignments, getProfessors
}
