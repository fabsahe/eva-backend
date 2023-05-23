const dotenv = require('dotenv')
const consola = require('consola')
const connectDB = require('../config/database')
const Form = require('../models/form.model')
const Question = require('../models/question.model')
const Answer = require('../models/answer.model')
const Timestamp = require('../models/timestamp.model')

dotenv.config()
connectDB()

const deleteForms = async () => {
  try {
    await Form.deleteMany()
    await Question.deleteMany()
    await Answer.deleteMany()
    await Timestamp.deleteMany()
    consola.success('Cuestionarios eliminados')
    return true
  } catch (error) {
    consola.error(error)
    return false
  }
}

async function clean () {
  await deleteForms()
  consola.log('...')

  // node js exit code
  process.exit(0)
}

clean()
