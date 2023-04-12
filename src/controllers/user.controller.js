const userService = require('../services/user.service')
const bcrypt = require('bcrypt')
const consola = require('consola')

const getAllUsers = async (req, res, next) => {
  const { userId, isAdmin } = req
  try {
    if (isAdmin) {
      const allUsers = await userService.getAllUsers()
      res.send({ status: 'OK', data: allUsers })
    } else {
      const user = await userService.getOneUser(userId)
      res.send({ status: 'OK', data: [user] })
    }
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: 'FAILED', data: { error: error?.message || error } })
  }
}

const createUser = async (req, res, next) => {
  const { email, name, password } = req.body
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const newUser = {
    email,
    name,
    passwordHash
  }
  try {
    const createdUser = await userService.createUser(newUser)
    res.status(201).send({ status: 'OK', data: createdUser })
  } catch (error) {
    consola.error(error)
    res
      .status(error?.status || 500)
      .send({ status: 'FAILED', data: { error: error?.message || error } })
  }
}

const updatePassword = async (req, res, next) => {
  const { userId, password } = req.body
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)
  try {
    const updatedPassword = await userService.updatePassword(userId, passwordHash)
    res.status(201).send({ status: 'OK', data: updatedPassword })
  } catch (error) {
    consola.error(error)
    res
      .status(error?.status || 500)
      .send({ status: 'FAILED', data: { error: error?.message || error } })
  }
}

module.exports = {
  getAllUsers,
  createUser,
  updatePassword
}
