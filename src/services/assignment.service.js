const Assignment = require('../models/assignment.model')
require('../models/subject.model')

const getAssignments = async (filterParams) => {
  try {
    const groups = await Assignment.find(filterParams)
    return groups
  } catch (e) {
    throw Error('Error al obtener las asignaciones')
  }
}

const getProfessors = async (filterParams) => {
  try {
    const professors = await Assignment.find(filterParams).populate('profesor').populate('materia')
    return professors
  } catch (e) {
    throw Error('Error al obtener los profesores')
  }
}

module.exports = {
  getAssignments, getProfessors
}
