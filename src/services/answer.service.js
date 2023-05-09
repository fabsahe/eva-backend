const Answer = require('../models/answer.model')

const getAnswersForm = async (filterParams) => {
  const answers = await Answer.find(filterParams)
  return answers
}

const createNewAnswer = async (answer) => {
  try {
    const createdAnswer = await Answer.create(answer)
    return createdAnswer
  } catch (e) {
    throw Error('Error al registrar respuesta')
  }
}

module.exports = {
  getAnswersForm,
  createNewAnswer

}
