const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema({
  sentence: String,
  type: String,
  options: {
    radios: [{ id: Number, value: String }],
    checkboxes: [{ id: Number, value: String, checked: Boolean }],
    scale: [{ value: String }],
    rows: [{ id: Number, value: String }],
    cols: [{ id: Number, value: String }],
    labels: [String]
  }
},
{
  collection: 'Preguntas'
})

const Question = mongoose.model('Pregunta', questionSchema)

module.exports = Question
