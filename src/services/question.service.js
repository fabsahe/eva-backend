const Question = require('../models/question.model')

const createNewQuestion = async (newQuestion) => {
  try {
    const createdQuestion = await Question.create(newQuestion)
    return createdQuestion
  } catch (e) {
    throw Error('Error al crear pregunta')
  }
}

module.exports = {
  createNewQuestion
}
