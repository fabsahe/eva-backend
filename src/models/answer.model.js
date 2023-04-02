const mongoose = require('mongoose')

const answerSchema = new mongoose.Schema({
  cuestionario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cuestionario'
  },
  carrera: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Carrera'
  },
  profesor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profesor'
  },
  grupo: String,
  respuestas: [{
    pregunta: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Pregunta'
    },
    respuesta: String
  }]
},
{
  collection: 'Respuestas'
})

const Answer = mongoose.model('Respuesta', answerSchema)

module.exports = Answer
