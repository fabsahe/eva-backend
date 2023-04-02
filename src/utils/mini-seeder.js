const dotenv = require('dotenv')
const consola = require('consola')
const bcrypt = require('bcrypt')
const Institute = require('../models/institute.model')
const Career = require('../models/career.model')
const Syllabus = require('../models/syllabus.model')
const Subject = require('../models/subject.model')
const Professor = require('../models/professor.model')
const Assignment = require('../models/assignment.model')
const Form = require('../models/form.model')
const User = require('../models/user.model')
const Period = require('../models/period.model')
const Question = require('../models/question.model')
const Answer = require('../models/answer.model')
const connectDB = require('../config/database')

dotenv.config()
connectDB()

const deleteAll = async () => {
  try {
    await Institute.deleteMany()
    await Syllabus.deleteMany()
    await Career.deleteMany()
    await Subject.deleteMany()
    await Professor.deleteMany()
    await Assignment.deleteMany()
    await Form.deleteMany()
    await User.deleteMany()
    await Period.deleteMany()
    await Question.deleteMany()
    await Answer.deleteMany()
    consola.success('Colecciones eliminadas')
    return true
  } catch (error) {
    consola.error(error)
    return false
  }
}

const seed = async () => {
  await deleteAll()
  consola.log('...')

  // Intitutos ----------------
  const institute1 = new Institute({
    codigo: '008',
    nombre: 'Instituto de agroindustrias'
  })
  const savedInstitute1 = await institute1.save()
  consola.success(`${savedInstitute1.nombre} guardado`)

  const institute2 = new Institute({
    codigo: '004',
    nombre: 'Instituto de física y matemáticas'
  })
  const savedInstitute2 = await institute2.save()
  consola.success(`${savedInstitute2.nombre} guardado`)

  const institute3 = new Institute({
    codigo: '005',
    nombre: 'Instituto de ciencias sociales y humanidades'
  })
  const savedInstitute3 = await institute3.save()
  consola.success(`${savedInstitute3.nombre} guardado`)

  // Carreras ------------------------
  const career1 = new Career({
    codigo: '06',
    nombre: 'Ingeniería en Alimentos',
    siglas: 'IA',
    instituto: savedInstitute1._id
  })
  const savedCareer1 = await career1.save()
  consola.success(`${savedCareer1.nombre} guardada`)

  const career2 = new Career({
    codigo: '17',
    nombre: 'Ingeniería en Física Aplicada',
    siglas: 'IFA',
    instituto: savedInstitute2._id
  })
  const savedCareer2 = await career2.save()
  consola.success(`${savedCareer2.nombre} guardada`)

  const career3 = new Career({
    codigo: '03',
    nombre: 'Licenciatura en Ciencias Empresariales',
    siglas: 'LCE',
    instituto: savedInstitute3._id
  })
  const savedCareer3 = await career3.save()
  consola.success(`${savedCareer3.nombre} guardada`)

  // Planes de estudio -------------
  const syllabus1 = new Syllabus({
    nombre: '3',
    carrera: savedCareer1._id
  })
  const savedSyllabus1 = await syllabus1.save()
  consola.success(`Plan ${savedSyllabus1.nombre} guardado`)

  const syllabus2 = new Syllabus({
    nombre: '1',
    carrera: savedCareer2._id
  })
  const savedSyllabus2 = await syllabus2.save()
  consola.success(`Plan ${savedSyllabus2.nombre} guardado`)

  // Materias
  const subject1 = new Subject({
    nombre: 'Formulación y Evaluación de Proyectos',
    semestre: 9,
    plan: savedSyllabus1._id
  })
  const savedSubject1 = await subject1.save()
  consola.success(`Materia ${savedSubject1.nombre} guardada`)

  const subject2 = new Subject({
    nombre: 'Ingeniería de Alimentos III',
    semestre: 9,
    plan: savedSyllabus1._id
  })
  const savedSubject2 = await subject2.save()
  consola.success(`Materia ${savedSubject2.nombre} guardada`)

  // Profesores
  const professor1 = new Professor({
    nombre: 'María De Jesús Pérez Álvarez',
    correo: 'mjesus@mixteco.utm.mx',
    password: 'x',
    nivel: 4,
    grado: 'C.P.',
    tipo: 0,
    instituto: savedInstitute3._id,
    carrera: savedCareer3._id
  })
  const savedProfessor1 = await professor1.save()
  consola.success(`Profesor ${savedProfessor1.nombre} guardado`)

  const professor2 = new Professor({
    nombre: 'Rogelio Valadez Blanco',
    correo: 'rvaladez@mixteco.utm.mx',
    password: 'x',
    nivel: 4,
    grado: 'Dr.',
    tipo: 0,
    instituto: savedInstitute1._id,
    carrera: savedCareer1._id
  })
  const savedProfessor2 = await professor2.save()
  consola.success(`Profesor ${savedProfessor2.nombre} guardado`)

  // Asignaciones
  const assignment1 = new Assignment({
    profesor: savedProfessor1._id,
    materia: savedSubject1._id,
    carrera: savedCareer1._id,
    grupo: '906-A',
    año: '2018',
    periodo: 'A',
    alumnos: 10,
    plan: '3',
    semestre: 9
  })
  const savedAssignment1 = await assignment1.save()
  consola.success(
    `La materia ${savedAssignment1.materia} se asignó al profesor ${savedProfessor1.nombre}`
  )

  const assignment2 = new Assignment({
    profesor: savedProfessor1._id,
    materia: savedSubject1._id,
    carrera: savedCareer2._id,
    grupo: '917-A',
    año: '2018',
    periodo: 'A',
    alumnos: 10,
    plan: '3',
    semestre: 9
  })
  const savedAssignment2 = await assignment2.save()
  consola.success(
    `La materia ${savedAssignment2.nombreMateria} se asignó al profesor ${savedProfessor1.nombre}`
  )

  const assignment3 = new Assignment({
    profesor: savedProfessor2._id,
    materia: savedSubject2._id,
    carrera: savedCareer1._id,
    grupo: '906-A',
    año: '2018',
    periodo: 'A',
    alumnos: 10,
    plan: '3',
    semestre: 9
  })
  const savedAssignment3 = await assignment3.save()
  consola.success(
    `La materia ${savedAssignment3.nombreMateria} se asignó al profesor ${savedProfessor2.nombre}`
  )

  // Usuarios
  const passwordHash = await bcrypt.hash('secreto', 10)
  const user = new User({
    email: 'admin@utm.mx',
    name: 'Administrador',
    passwordHash
  })
  const savedUser = await user.save()
  consola.success(
    `Usuario guardado: ${savedUser.email}`
  )

  // periodos
  const period1 = new Period({
    año: '2020',
    nombres: ['A', 'B', 'Verano'],
    actual: -1
  })
  const savedPeriod1 = await period1.save()

  const period2 = new Period({
    año: '2021',
    nombres: ['A', 'B', 'Verano'],
    actual: -1
  })
  const savedPeriod2 = await period2.save()

  const period3 = new Period({
    año: '2022',
    nombres: ['A', 'B', 'Verano'],
    actual: -1
  })
  const savedPeriod3 = await period3.save()

  const period4 = new Period({
    año: '2023',
    nombres: ['A', 'B'],
    actual: 0
  })
  const savedPeriod4 = await period4.save()

  consola.success(`Periodo ${savedPeriod1['año']}-${savedPeriod1.nombre} guardado`)
  consola.success(`Periodo ${savedPeriod2['año']}-${savedPeriod2.nombre} guardado`)
  consola.success(`Periodo ${savedPeriod3['año']}-${savedPeriod3.nombre} guardado`)
  consola.success(`Periodo ${savedPeriod4['año']}-${savedPeriod4.nombre} guardado`)
}

seed()

setTimeout(function () {
  return process.exit(0) // node js exit code
}, 800)
