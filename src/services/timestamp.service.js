const Timestamp = require('../models/timestamp.model')

const getTimestamps = async (filter) => {
  const timestamps = await Timestamp.find(filter)
    .populate('answers', 'answers question')
    .populate('professor', 'nombre')

  return timestamps
}

const createNewTimestamp = async (timestamp) => {
  try {
    const createdTimestamp = await Timestamp.create(timestamp)
    return createdTimestamp
  } catch (e) {
    throw Error('Error al registrar respuesta')
  }
}

module.exports = {
  getTimestamps,
  createNewTimestamp
}
