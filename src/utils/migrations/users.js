const consola = require('consola')
const bcrypt = require('bcrypt')
const User = require('../../models/user.model')

const saveUsers = async (connection) => {
  const adminPasswordHash = await bcrypt.hash('secreto', 10)
  const admin = new User({
    email: 'admin@utm.mx',
    name: 'Administrador',
    passwordHash: adminPasswordHash
  })
  const savedUser = await admin.save()
  consola.success(
    `Administrador registrado: ${savedUser.email}`
  )

  const [rows] = await connection.query(
    'SELECT * FROM profesores WHERE nivel = 3'
  )
  const users = await Promise.all(
    rows.map(async (row) => {
      const passwordHash = await bcrypt.hash('secreto', 10)
      return {
        email: row.correo,
        nombre: row.nombre,
        passwordHash
      }
    })
  )

  const savedUsers = await Promise.all(
    users.map(async (user) => {
      const tempUser = new User(user)
      return await tempUser.save()
    })
  )

  if (savedUsers) {
    consola.success('Jefes de Carrera asignados como usuarios')
  }
}

module.exports = saveUsers
