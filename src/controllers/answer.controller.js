const answerService = require('../services/answer.service')
const formService = require('../services/form.service')
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

const createNewAnswers = async (req, res, next) => {
  const { formId, answers } = req.body
  try {
    const createdAnswers = await Promise.all(
      answers.map(async (answer) => {
        return await answerService.createNewAnswer(answer)
      })
    )
    await formService.addAnswersNumber(formId)
    res.status(201).send({ status: 'OK', data: createdAnswers.length })
  } catch (error) {
    consola.error(error)
    res
      .status(error?.status || 500)
      .send({ status: 'FAILED', data: { error: error?.message || error } })
  }
}

module.exports = {
  getAnswersForm,
  createNewAnswers
}
