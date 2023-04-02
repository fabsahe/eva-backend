const User = require('../models/user.model')

const login = async (email) => {
  const user = await User.findOne({ email })
  return user
}

module.exports = {
  login
}
