const Version = require('../models/version.model')

exports.getVersion = async function () {
  try {
    const version = await Version.find({ current: true })
    return version
  } catch (e) {
    throw Error('Error al obtener versión')
  }
}
