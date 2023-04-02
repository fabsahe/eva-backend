const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema({
  pregunta: String,
  opciones: [{
    texto: String
  }]
},
{
  collection: 'Preguntas'
})

const Question = mongoose.model('Pregunta', questionSchema)

module.exports = Question
