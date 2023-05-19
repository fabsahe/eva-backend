const Form = require('../models/form.model')
const Question = require('../models/question.model')

const getAllForms = async (userFilter) => {
  const allForms = await Form.find(userFilter).populate('careers').populate('user')
  return allForms
}

const getOneForm = async (formId) => {
  const form = await Form.findById(formId).populate('careers').populate('questions')
  return form
}

const getFormQuestions = async (formId) => {
  const questions = await Form.findById(formId)
    .select('title questions')
    .populate('questions')
  return questions
}

const availableTitle = async (filterParams) => {
  try {
    const form = await Form.find(filterParams)
    return form
  } catch (e) {
    throw Error('Error al buscar cuestionario')
  }
}

const createNewForm = async (newForm) => {
  try {
    const createdForm = await Form.create(newForm)
    return createdForm
  } catch (e) {
    throw Error('Error al crear el cuestionario')
  }
}

const updateOneForm = async (formId, newForm) => {
  try {
    // eliminar las preguntas antiguas
    const currentForm = await Form.findById(formId)
    const oldQuestions = currentForm.questions
    await Question.deleteMany({ _id: { $in: oldQuestions } })
    // actualizar con nuevas preguntas
    const updatedForm = await Form.findByIdAndUpdate(formId, newForm)
    return updatedForm
  } catch (e) {
    throw Error('Error al crear el cuestionario')
  }
}

const addAnswersNumber = async (formId) => {
  try {
    const form = await Form.findById(formId)
    form.answersNumber += 1
    await form.save()
    return form
  } catch (e) {
    throw Error('Error al agregar contador')
  }
}

module.exports = {
  getAllForms,
  getOneForm,
  getFormQuestions,
  availableTitle,
  createNewForm,
  updateOneForm,
  addAnswersNumber
}
