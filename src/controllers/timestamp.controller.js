const timestampService = require('../services/timestamp.service')

const getTimestamps = async (req, res, next) => {
  const filter = req.query
  try {
    const timestamps = await timestampService.getTimestamps(filter)
    res.send({ status: 'OK', data: timestamps })
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: 'FAILED', data: { error: error?.message || error } })
  }
}

module.exports = {
  getTimestamps
}
