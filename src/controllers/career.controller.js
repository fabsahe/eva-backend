const careerService = require('../services/career.service')

const getCareers = async (req, res, next) => {
  try {
    const careers = await careerService.getCareers()
    res.send({
      status: 'OK',
      data: careers,
      message: 'Carreras obtenidas'
    })
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: 'FAILED', data: { error: error?.message || error } })
  }
}

module.exports = {
  getCareers
}
