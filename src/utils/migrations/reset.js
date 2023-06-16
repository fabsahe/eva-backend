const consola = require('consola')
const Institute = require('../../models/institute.model')
const Career = require('../../models/career.model')
const Syllabus = require('../../models/syllabus.model')
const Subject = require('../../models/subject.model')
const Professor = require('../../models/professor.model')
const Assignment = require('../../models/assignment.model')
const Form = require('../../models/form.model')
const User = require('../../models/user.model')
const Period = require('../../models/period.model')
const Question = require('../../models/question.model')
const Answer = require('../../models/answer.model')
const Version = require('../../models/version.model')

const deleteAll = async () => {
  try {
    await Institute.deleteMany()
    await Syllabus.deleteMany()
    await Career.deleteMany()
    await Subject.deleteMany()
    await Professor.deleteMany()
    await Assignment.deleteMany()
    await User.deleteMany()
    await Period.deleteMany()
    await Form.deleteMany()
    await Question.deleteMany()
    await Answer.deleteMany()
    await Version.deleteMany()
    consola.success('Colecciones eliminadas')
    return true
  } catch (error) {
    consola.error(error)
    return false
  }
}

module.exports = deleteAll
