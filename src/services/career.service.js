const Career = require('../models/career.model')

exports.getCareers = async function () {
  try {
    const careers = await Career.find({})
    return careers
  } catch (e) {
    throw Error('Error al obtener profesores')
  }
}
