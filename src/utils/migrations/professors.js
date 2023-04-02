const consola = require('consola')
const Institute = require('../../models/institute.model')
const Career = require('../../models/career.model')
const Professor = require('../../models/professor.model')
const { loading, stopLoading } = require('../loader')

const saveProfessors = async (connection) => {
  const timerID = loading()

  const [rows] = await connection.query('SELECT * FROM profesores')
  const professors = await Promise.all(
    rows.map(async (row) => {
      const instituteResponse = await Institute.find({
        codigo: row.instituto
      })
      const institute = instituteResponse[0]?._id ?? null
      const careerResponse = await Career.find({
        codigo: row.carrera
      })
      const career = careerResponse[0]?._id ?? null

      return {
        nombre: row.nombre,
        correo: row.correo,
        nivel: row.nivel,
        grado: row.grado,
        tipo: row.tipo,
        instituto: institute,
        carrera: career
      }
    })
  )

  const savedProfessors = await Promise.all(
    professors.map(async (professor) => {
      const tempProfessor = new Professor(professor)
      return await tempProfessor.save()
    })
  )
  stopLoading(timerID)

  if (savedProfessors) {
    consola.success('Profesores registrados')
  }
}

module.exports = saveProfessors
