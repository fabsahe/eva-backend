const Timestamp = require('../models/timestamp.model')

const createNewTimestamp = async (timestamp) => {
  try {
    const createdTimestamp = await Timestamp.create(timestamp)
    return createdTimestamp
  } catch (e) {
    throw Error('Error al registrar respuesta')
  }
}

module.exports = {
  createNewTimestamp
}
