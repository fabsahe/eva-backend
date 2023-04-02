const Answer = require('../models/answer.model')

const getAnswersForm = async (filterParams) => {
  const answers = await Answer.find(filterParams)
  return answers
}

const createNewAnswer = async (answer) => {
  // console.log(newForm)
  try {
    const createdForm = await Answer.create(answer)
    return createdForm
  } catch (e) {
    throw Error('Error al crear el cuestionario')
  }
}

module.exports = {
  getAnswersForm,
  createNewAnswer

}
