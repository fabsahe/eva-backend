const User = require('../models/user.model')

const getAllUsers = async () => {
  const allUsers = await User.find({})
  return allUsers
}

const getOneUser = async (userId) => {
  const user = await User.findById(userId)
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

const updatePassword = async (userId, passwordHash) => {
  try {
    const updatedPassword = await User.findByIdAndUpdate(userId, { passwordHash })
    if (updatedPassword) {
      return true
    }
    return false
  } catch (e) {
    throw Error('Error al actualizar contraseña')
  }
}

module.exports = {
  getAllUsers,
  getOneUser,
  createUser,
  updatePassword
}
