const answerService = require('../services/answer.service')
const consola = require('consola')

const getAnswersForm = async (req, res, next) => {
  const { formId } = req.params
  try {
    const answers = await answerService.getAnswersForm({ cuestionario: formId })
    res.send({ status: 'OK', data: answers })
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: 'FAILED', data: { error: error?.message || error } })
  }
}

const createNewAnswer = async (req, res, next) => {
  const { body } = req

  try {
    const createdForm = await answerService.createNewAnswer(body)
    res.status(201).send({ status: 'OK', data: createdForm })
  } catch (error) {
    consola.error(error)
    res
      .status(error?.status || 500)
      .send({ status: 'FAILED', data: { error: error?.message || error } })
  }
}

module.exports = {
  getAnswersForm,
  createNewAnswer
}
