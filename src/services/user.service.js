const User = require('../models/user.model')

const getAllUsers = async () => {
  const allUsers = await User.find({})
  return allUsers
}

const getOneUser = async (email) => {
  const user = await User.findOne(email)
  return user
}

const createUser = async (newUser) => {
  try {
    const createdUser = await User.create(newUser)
    return createdUser
  } catch (e) {
    throw Error('Error al crear el usuario')
  }
}

module.exports = {
  getAllUsers,
  getOneUser,
  createUser
}
