const periodService = require('../services/period.service')
// const consola = require('consola')

const getAllPeriods = async (req, res, next) => {
  try {
    const allPeriods = await periodService.getAllPeriods()
    res.send({ status: 'OK', data: allPeriods })
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: 'FAILED', data: { error: error?.message || error } })
  }
}

module.exports = {
  getAllPeriods
}
