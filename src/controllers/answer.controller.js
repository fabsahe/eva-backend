const answerService = require('../services/answer.service')
const formService = require('../services/form.service')
const timestampService = require('../services/timestamp.service')
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
    const career = createdAnswers[0].career
    const professor = createdAnswers[0].professor
    const subject = createdAnswers[0].subject
    const group = createdAnswers[0].group
    const timestamp = {
      form: formId,
      career,
      professor,
      subject,
      group,
      answers: createdAnswers
    }
    const createdTimestamp = await timestampService.createNewTimestamp(timestamp)

    await formService.addAnswersNumber(formId)
    res.status(201).send({ status: 'OK', data: createdTimestamp.answers.length })
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
