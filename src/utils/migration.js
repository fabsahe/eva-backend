const dotenv = require('dotenv')
const consola = require('consola')
const mysql = require('mysql2/promise')
const connectDB = require('../config/database')
const deleteAll = require('./migrations/reset')
const saveInstitutes = require('./migrations/institutes')
const saveCareers = require('./migrations/careers')
const saveSyllabuses = require('./migrations/syllabuses')
const saveProfessors = require('./migrations/professors')
const savePeriods = require('./migrations/periods')
const saveSubjects = require('./migrations/subjects')
const saveAssignments = require('./migrations/assignments')
const saveMultiGroups = require('./migrations/multigroups')
const saveUsers = require('./migrations/users')

dotenv.config()
connectDB()

function printTime (start, end) {
  const seconds = (end - start) / 1000
  consola.log('...')
  consola.success(`Migración realizada en ${seconds} segundos`)
}

async function getData () {
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'horariosnueva'
    })

    await saveInstitutes(connection)
    await saveCareers(connection)
    await saveSyllabuses(connection)
    await saveProfessors(connection)
    await savePeriods(connection)
    await saveSubjects(connection)
    await saveAssignments(connection)
    await saveMultiGroups(connection)
    await saveUsers(connection)

    await connection.end()
  } catch (error) {
    consola.error(error)
  }
}

async function migrate () {
  const start = Date.now()

  await deleteAll()
  consola.log('...')
  await getData()

  const end = Date.now()
  printTime(start, end)
  // node js exit code
  process.exit(0)
}

migrate()

/*
setTimeout(function () {
  return process.exit(0) // node js exit code
}, 20000) */
