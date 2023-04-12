const Form = require('../models/form.model')

const getAllForms = async (userFilter) => {
  const allForms = await Form.find(userFilter).populate('carreras').populate('usuario')
  return allForms
}

const getOneForm = async (formId) => {
  const form = await Form.findById(formId).populate('carreras').populate('preguntas')
  return form
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
    const updatedForm = await Form.findByIdAndUpdate(formId, newForm)
    return updatedForm
  } catch (e) {
    throw Error('Error al crear el cuestionario')
  }
}

module.exports = {
  getAllForms,
  getOneForm,
  availableTitle,
  createNewForm,
  updateOneForm
}
