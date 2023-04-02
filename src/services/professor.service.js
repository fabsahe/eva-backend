const Professor = require('../models/professor.model')

const getProfessors = async (filterParams) => {
  try {
    const professors = await Professor.find(filterParams)
    return professors
  } catch (e) {
    throw Error('Error al obtener profesores')
  }
}

module.exports = {
  getProfessors
}
