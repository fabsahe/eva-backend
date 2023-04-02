const consola = require('consola')
const Institute = require('../../models/institute.model')
const Career = require('../../models/career.model')

const saveCareers = async (connection) => {
  const [rows] = await connection.query('SELECT * FROM carreras')
  const careers = await Promise.all(
    rows.map(async (row) => {
      const instituteResponse = await Institute.find({ codigo: row.codigoInstituto })
      const institute = instituteResponse.length > 0 ? instituteResponse[0]._id : ''
      const instituteCode = instituteResponse.length > 0 ? instituteResponse[0].codigo : ''
      return {
        codigo: row.codigoCarrera,
        nombre: row.nombre,
        siglas: row.siglas,
        instituto: institute,
        codigoInstituto: instituteCode
      }
    })
  )

  const savedCareers = await Promise.all(
    careers.map(async (career) => {
      const tempCareer = new Career(career)
      return await tempCareer.save()
    })
  )

  if (savedCareers) {
    consola.success('Carreras registradas')
  }
}

module.exports = saveCareers
