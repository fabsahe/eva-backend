const professorService = require('../services/professor.service')

const getProfessors = async (req, res, next) => {
  const { group } = req.params
  try {
    const professors = await professorService.getProfessors({ grupo: group })
    res.send({
      status: 'OK',
      data: professors,
      message: 'Profesores obtenidos'
    })
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: 'FAILED', data: { error: error?.message || error } })
  }
}

const getAllProfessors = async (req, res, next) => {
  try {
    const professors = await professorService.getProfessors({})
    res.send({
      status: 'OK',
      data: professors,
      message: 'Profesores obtenidos'
    })
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: 'FAILED', data: { error: error?.message || error } })
  }
}

module.exports = {
  getProfessors,
  getAllProfessors
}
