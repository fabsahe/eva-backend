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
const Version = require('../models/version.model')

dotenv.config()
connectDB()

let dbHost = ''
let dbUser = ''
let dbPassword = ''
let dbName = ''
let dbPort = ''

if (process.env.MODE === 'dev') {
  dbHost = process.env.DB_HOST_D
  dbUser = process.env.DB_USER_D
  dbPassword = process.env.DB_PASS_D
  dbName = process.env.DB_NAME_D
  dbPort = process.env.DB_PORT_D
}
if (process.env.MODE === 'prod') {
  dbHost = process.env.DB_HOST_P
  dbUser = process.env.DB_USER_P
  dbPassword = process.env.DB_PASS_P
  dbName = process.env.DB_NAME_P
  dbPort = process.env.DB_PORT_P
}

function printTime (start, end) {
  const seconds = (end - start) / 1000
  consola.log('...')
  consola.success(`Migración realizada en ${seconds} segundos`)
}

async function saveVersion () {
  const version = {
    code: '1.0.0',
    current: true
  }
  const newVersion = new Version(version)
  const savedVersion = await newVersion.save()
  consola.success(`Versión ${savedVersion.code} guardada`)
}

async function getData () {
  try {
    const connection = await mysql.createConnection({
      host: dbHost,
      user: dbUser,
      password: dbPassword,
      database: dbName,
      port: dbPort
    })
    consola.success('Conexión MySQL realizada :)')
    consola.log('...')

    await saveInstitutes(connection)
    await saveCareers(connection)
    await saveSyllabuses(connection)
    await saveProfessors(connection)
    await savePeriods(connection)
    await saveSubjects(connection)
    await saveAssignments(connection)
    await saveMultiGroups(connection)
    await saveUsers(connection)
    await saveVersion()

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
