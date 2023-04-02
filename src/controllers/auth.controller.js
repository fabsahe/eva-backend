const authService = require('../services/auth.service')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const consola = require('consola')

const login = async (req, res, next) => {
  const { email, password } = req.body

  try {
    const user = await authService.login(email)

    const passwordMatch = user === null
      ? false
      : await bcrypt.compare(password, user.passwordHash)

    if (!(user && passwordMatch)) {
      res.status(401).send({
        error: 'Usuario o contraseña incorrectos'
      })
      return
    }
    const userForToken = {
      id: user._id,
      email: user.email
    }

    const token = jwt.sign(
      userForToken,
      process.env.JWT_SECRET,
      { expiresIn: 60 * 60 * 24 * 7 }
    )

    res.send({
      status: 'OK',
      data: {
        email: user.email,
        token
      }
    })
  } catch (error) {
    consola.error(error)
    res
      .status(error?.status || 500)
      .send({ status: 'FAILED', data: { error: error?.message || error } })
  }
}

module.exports = {
  login
}
