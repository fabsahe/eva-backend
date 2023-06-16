const versionService = require('../services/version.service')

const getVersion = async (req, res, next) => {
  try {
    const version = await versionService.getVersion()
    res.send({
      status: 'OK',
      data: version,
      message: 'Versión obtenida'
    })
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: 'FAILED', data: { error: error?.message || error } })
  }
}

module.exports = {
  getVersion
}
