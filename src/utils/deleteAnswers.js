/* eslint-disable no-unused-vars */
const dotenv = require('dotenv')
const consola = require('consola')
const connectDB = require('../config/database')
const Form = require('../models/form.model')
const Question = require('../models/question.model')
const Answer = require('../models/answer.model')

dotenv.config()
connectDB()

const deleteAnswers = async () => {
  try {
    await Answer.deleteMany()
    consola.success('Respuestas eliminadas')
    await Form.updateMany({}, { $set: { answersNumber: 0 } })
    consola.success('Contadores en cero')
    return true
  } catch (error) {
    consola.error(error)
    return false
  }
}

async function empty () {
  await deleteAnswers()
  consola.log('---')

  // node js exit code
  process.exit(0)
}

empty()
