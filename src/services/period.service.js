const Period = require('../models/period.model')

const getAllPeriods = async () => {
  const allPeriods = await Period.find({})
  return allPeriods
}

module.exports = {
  getAllPeriods
}
