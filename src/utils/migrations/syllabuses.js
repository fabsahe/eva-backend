const consola = require('consola')
const Syllabus = require('../../models/syllabus.model')
const Career = require('../../models/career.model')

const saveSyllabuses = async (connection) => {
  const [rows] = await connection.query('SELECT * FROM planes')
  const syllabuses = await Promise.all(
    rows.map(async (row) => {
      const careerResponse = await Career.find({ codigo: row.codigoCarrera })
      const career = careerResponse.length > 0 ? careerResponse[0]._id : null
      return {
        nombre: row.nombre.replace('Maestríaen', 'Maestría en'),
        carrera: career,
        oid: row.idPlan
      }
    })
  )

  const savedSyllabuses = await Promise.all(
    syllabuses.map(async (syllabus) => {
      const tempSyllabus = new Syllabus(syllabus)
      return await tempSyllabus.save()
    })
  )

  if (savedSyllabuses) {
    consola.success('Planes de estudio registrados')
  }
}

module.exports = saveSyllabuses
