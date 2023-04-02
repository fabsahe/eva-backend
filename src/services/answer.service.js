const Answer = require('../models/answer.model')
const Form = require('../models/form.model')

const getAnswersForm = async (filterParams) => {
  const answers = await Answer.find(filterParams)
  return answers
}

const createNewAnswer = async (answer) => {
  try {
    const createdAnswer = await Answer.create(answer)
    const form = await Form.findById(answer.cuestionario)
    form.numeroRespuestas += 1
    await form.save()
    return createdAnswer
  } catch (e) {
    throw Error('Error al registrar respuesta')
  }
}

module.exports = {
  getAnswersForm,
  createNewAnswer

}
