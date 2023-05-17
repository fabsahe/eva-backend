const Answer = require('../models/answer.model')
const Career = require('../models/career.model')
const Professor = require('../models/professor.model')

/* function removeDuplicates (arr) {
  return arr.filter((item, index) => arr.indexOf(item) === index)
} */

const getAnswersForm = async (filterParams) => {
  const answers = await Answer.find(filterParams)
  return answers
}

const getFormAnswers = async (questions) => {
  const formAnswers = await Promise.all(
    questions.map(async (question) => {
      const answers = await Answer.find({ question: question._id })
      const answerData = {
        id: question._id,
        sentence: question.sentence,
        type: question.type,
        answers
      }
      if (question.type === 'grid') {
        answerData.labels = question.options.cols.map((item) => item.value)
        answerData.subQuestions = question.options.rows.map((item, index) => ({
          id: index,
          value: item.value
        }))
      }
      if (question.type === 'checkboxes') {
        answerData.labels = question.options.checkboxes.map((item) => item.value)
      }
      return answerData
    })
  )
  return formAnswers
}

const getAnswersCareers = async (questions) => {
  const questionsId = questions.map((question) => question._id)
  const careersFound = await Answer.aggregate([
    { $match: { question: { $in: questionsId } } },
    { $group: { _id: '$career', count: { $sum: 1 } } },
    { $project: { _id: 0, career: '$_id' } }
  ])
  const careersList = careersFound.map((career) => career.career)
  const careers = await Career.find({ _id: { $in: careersList } })
  return careers
}

const getAnswersProfessors = async (questions) => {
  const questionsId = questions.map((question) => question._id)
  const professorsFound = await Answer.aggregate([
    { $match: { question: { $in: questionsId } } },
    { $group: { _id: '$professor', count: { $sum: 1 } } },
    { $project: { _id: 0, professor: '$_id' } }
  ])
  const professorsList = professorsFound.map((professor) => professor.professor)
  const professors = await Professor.find({ _id: { $in: professorsList } })
  return professors
}

const getAnswersGroups = async (questions) => {
  const questionsId = questions.map((question) => question._id)
  const groupsFound = await Answer.aggregate([
    { $match: { question: { $in: questionsId } } },
    { $group: { _id: '$group', count: { $sum: 1 } } },
    { $project: { _id: 1, nombre: '$_id' } }
  ])
  return groupsFound
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
  getFormAnswers,
  getAnswersCareers,
  getAnswersGroups,
  getAnswersProfessors,
  createNewAnswer

}
