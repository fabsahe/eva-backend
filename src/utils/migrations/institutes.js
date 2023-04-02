const consola = require('consola')
const Institute = require('../../models/institute.model')

const saveInstitutes = async (connection) => {
  const [rows] = await connection.query('SELECT * FROM institutos')
  const institutes = rows.map(row => {
    return {
      codigo: row.codigo,
      nombre: row.nombre
    }
  })

  const savedInstitutes = await Promise.all(
    institutes.map(async (institute) => {
      const tempInstitute = new Institute(institute)
      return await tempInstitute.save()
    })
  )

  if (savedInstitutes) {
    consola.success('Institutos registrados')
  }
}

module.exports = saveInstitutes
