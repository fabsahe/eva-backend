/* eslint-disable no-unused-vars */
const formService = require('../services/form.service')
const questionService = require('../services/question.service')
const User = require('../models/user.model')
const consola = require('consola')

async function generateForm (isEmpty, data, userId) {
  const user = await User.findById(userId)
  const { title, year, period, careers, questions, startDate, endDate } = data

  const year1 = parseInt(startDate.slice(0, 4))
  const month1 = parseInt(startDate.slice(5, 7)) - 1
  const day1 = parseInt(startDate.slice(8, 10))

  const year2 = parseInt(endDate.slice(0, 4))
  const month2 = parseInt(endDate.slice(5, 7)) - 1
  const day2 = parseInt(endDate.slice(8, 10))

  const commonProperties = {
    title,
    startDate: new Date(year1, month1, day1),
    endDate: new Date(year2, month2, day2, 23, 59, 59)
  }

  if (isEmpty) {
    const savedQuestions = await Promise.all(
      questions.map(async (question) => {
        const { key, sentence, type, options } = question
        const newQuestion = { key, sentence, type, options }
        const createdQuestion = await questionService.createNewQuestion(newQuestion)
        return createdQuestion._id
      })
    )

    const newForm = {
      ...commonProperties,
      year,
      careers,
      period,
      questions: savedQuestions,
      answersNumber: 0,
      user: user._id
    }
    return newForm
  } else {
    const newForm = {
      ...commonProperties
    }
    return newForm
  }
}

const getAllForms = async (req, res, next) => {
  const { userId, isAdmin } = req
  try {
    let userFilter = null
    if (isAdmin) {
      userFilter = {}
    } else {
      userFilter = { usuario: userId }
    }
    const allForms = await formService.getAllForms(userFilter)
    res.send({ status: 'OK', data: allForms })
  } catch (error) {
    consola.error(error)
    res
      .status(error?.status || 500)
      .send({ status: 'FAILED', data: { error: error?.message || error } })
  }
}

const getOneForm = async (req, res, next) => {
  const { formId } = req.params
  try {
    const form = await formService.getOneForm(formId)
    res.send({ status: 'OK', data: form })
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: 'FAILED', data: { error: error?.message || error } })
  }
}

const availableTitle = async (req, res, next) => {
  const { title, formId } = req.body
  try {
    const form = await formService.availableTitle({ title })
    if (form.length === 0) {
      res.send({
        status: 'OK',
        data: true,
        message: 'Título disponible'
      })
      return
    }
    if (form.length === 1 && form[0]._id.toString() === formId) {
      res.send({
        status: 'OK',
        data: true,
        message: 'Título disponible'
      })
      return
    }
    res.send({
      status: 'OK',
      data: false,
      message: 'Título no disponible'
    })
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: 'FAILED', data: { error: error?.message || error } })
  }
}

const createNewForm = async (req, res, next) => {
  const { body, userId } = req
  const isEmpty = true

  const newForm = await generateForm(isEmpty, body, userId)

  try {
    const createdForm = await formService.createNewForm(newForm)
    res.status(201).send({ status: 'OK', data: createdForm })
  } catch (error) {
    consola.error(error)
    res
      .status(error?.status || 500)
      .send({ status: 'FAILED', data: { error: error?.message || error } })
  }
}

const updateOneForm = async (req, res, next) => {
  const { body, userId } = req
  const { formId } = req.params
  const { isEmpty } = body

  const newForm = await generateForm(isEmpty, body, userId)

  try {
    const updatedForm = await formService.updateOneForm(formId, newForm)
    res.status(201).send({ status: 'OK', data: updatedForm })
  } catch (error) {
    consola.error(error)
    res
      .status(error?.status || 500)
      .send({ status: 'FAILED', data: { error: error?.message || error } })
  }
}

module.exports = {
  getAllForms,
  getOneForm,
  availableTitle,
  createNewForm,
  updateOneForm
}
