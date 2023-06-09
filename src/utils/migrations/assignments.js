const consola = require('consola')
const Professor = require('../../models/professor.model')
const Subject = require('../../models/subject.model')
const Assignment = require('../../models/assignment.model')
const { loading, stopLoading } = require('../loader')

function getLetter (number) {
  return String.fromCharCode(65 + number - 1)
}

const saveAssignments = async (connection) => {
  const timerID = loading()

  const [rows] = await connection.query('SELECT * FROM profesorYmateria')
  const assignments = await Promise.all(
    rows.map(async (row) => {
      // obtener profesor relacionado en mongo
      const professorResponse = await Professor.find({
        correo: row.profesor
      })
      const professor = professorResponse[0]?._id ?? null

      // obtener id de materia original en mysql
      const [subjectQuery] = await connection.query(
        `SELECT * FROM materias WHERE id = ${row.idMateria}`
      )
      if (!subjectQuery.length) {
        throw new Error('Materia de la asignación no encontrada')
      }
      const originalSubject = subjectQuery[0]
      // obtener materia relacionada en mongo
      const subjectResponse = await Subject.find({
        oid: originalSubject.id
      }).populate('carrera')
      const subject = subjectResponse[0]

      // formar string para grupo
      const groupNumber = row.grupo
      const year = row.anyo
      const semester = subject.semestre
      const careerCode = subject.carrera.codigo
      const careerAcronym = subject.carrera.siglas
      const instituteCode = subject.carrera.codigoInstituto

      const groupLetter = groupNumber <= 1 ? 'A' : getLetter(groupNumber)

      let groupFullText = ''
      if (semester <= 0) {
        // grupo propedeutico
        if (semester === 0) {
          const pcGroup = groupNumber === 0 ? '001' : `00${groupNumber}`
          groupFullText = `PC${careerAcronym}-${pcGroup}`
        } else if (semester === -1) {
          groupFullText = `PL-${year}`
        } else {
          groupFullText = 'UNDEFINED'
        }
      } else {
        groupFullText =
        instituteCode === '100'
          ? `${careerAcronym}-${groupLetter}`
          : `${semester}${careerCode}-${groupLetter}`
      }

      return {
        profesor: professor,
        materia: subject._id,
        carrera: subject.carrera._id,
        grupo: groupFullText,
        año: row.anyo,
        periodo: row.nombrePeriodo,
        alumnos: row.alumnosNormales + row.alumnosRecursadores,
        plan: subject.nombrePlan,
        semestre: semester
      }
    })
  )

  const savedAssignments = await Promise.all(
    assignments.map(async (assignment) => {
      const tempAssignment = new Assignment(assignment)
      return await tempAssignment.save()
    })
  )
  stopLoading(timerID)

  if (savedAssignments) {
    consola.success('Asignaciones registradas')
  }
}

module.exports = saveAssignments
