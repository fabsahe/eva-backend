const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  const authorization = req.get('authorization')
  let token = ''

  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    token = authorization.substring(7)
  }

  const decodedToken = jwt.verify(token, process.env.JWT_SECRET)

  if (!token || !decodedToken.id) {
    return res.status(401).send({
      error: 'Token no válido o inexistente'
    })
  }

  const { id: userId, type } = decodedToken
  req.userId = userId
  req.isAdmin = type === 'admin'

  next()
}
