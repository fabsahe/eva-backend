const answerService = require('../services/answer.service')
const formService = require('../services/form.service')
const consola = require('consola')

const getFormAnswers = async (req, res, next) => {
  const { formId } = req.params
  try {
    const form = await formService.getFormQuestions(formId)
    const { questions } = form
    const answers = await answerService.getFormAnswers(questions)
    const careers = await answerService.getAnswersCareers(questions)
    const professors = await answerService.getAnswersProfessors(questions)
    const groups = await answerService.getAnswersGroups(questions)
    const formAnswers = {
      title: form.title,
      questions: answers,
      careers,
      professors,
      groups
    }
    res.send({ status: 'OK', data: formAnswers })
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
  getFormAnswers,
  createNewAnswers
}
