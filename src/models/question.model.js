const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema({
  key: Number,
  sentence: String,
  type: String,
  options: {
    radios: [{ key: Number, value: String }],
    dropdown: [{ key: Number, value: String }],
    checkboxes: [{ key: Number, value: String, checked: Boolean }],
    scale: [{ value: Number }],
    rows: [{ key: Number, value: String }],
    cols: [{ key: Number, value: String }],
    labels: [String]
  }
},
{
  collection: 'Preguntas'
})

const Question = mongoose.model('Pregunta', questionSchema)

module.exports = Question
