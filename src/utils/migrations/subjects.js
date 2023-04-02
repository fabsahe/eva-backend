const consola = require('consola')
const Syllabus = require('../../models/syllabus.model')
const Career = require('../../models/career.model')
const Subject = require('../../models/subject.model')
const { loading, stopLoading } = require('../loader')

const saveSubjects = async (connection) => {
  const timerID = loading()

  const [rows] = await connection.query('SELECT * FROM materias')
  const subjects = await Promise.all(
    rows.map(async (row) => {
      const [syllabusQuery] = await connection.query(
        `SELECT * FROM planes WHERE idplan = ${row.idplan}`
      )
      if (!syllabusQuery.length) throw new Error('Plan de estudios no encontrado')

      const originalSyllabus = syllabusQuery[0]
      const careerResponse = await Career.find({
        codigo: originalSyllabus.codigoCarrera
      })
      const career = careerResponse.length > 0 ? careerResponse[0]._id : null
      const syllabusResponse = await Syllabus.find({
        oid: originalSyllabus.idPlan
      })
      const syllabus = syllabusResponse[0]
      return {
        nombre: row.nombre,
        semestre: row.semestre,
        carrera: career,
        nombrePlan: syllabus.nombre,
        plan: syllabus._id,
        oid: row.id
      }
    })
  )

  const savedSubjects = await Promise.all(
    subjects.map(async (subject) => {
      const tempSubject = new Subject(subject)
      return await tempSubject.save()
    })
  )
  stopLoading(timerID)

  if (savedSubjects) {
    consola.success('Materias registradas')
  }
}

module.exports = saveSubjects
