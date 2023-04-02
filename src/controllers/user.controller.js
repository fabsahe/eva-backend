const userService = require('../services/user.service')
const bcrypt = require('bcrypt')
const consola = require('consola')

const getAllUsers = async (req, res, next) => {
  try {
    const allUsers = await userService.getAllUsers()
    res.send({ status: 'OK', data: allUsers })
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

module.exports = {
  getAllUsers,
  createUser
}
