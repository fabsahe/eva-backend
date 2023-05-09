const mongoose = require('mongoose')

const answerSchema = new mongoose.Schema({
  career: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Carrera'
  },
  professor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profesor'
  },
  group: String,
  question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pregunta'
  },
  answers: [String]
},
{
  collection: 'Respuestas'
})

const Answer = mongoose.model('Respuesta', answerSchema)

module.exports = Answer
