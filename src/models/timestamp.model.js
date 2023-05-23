const mongoose = require('mongoose')

const timestampSchema = new mongoose.Schema({
  form: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cuestionario'
  },
  career: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Carrera'
  },
  professor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profesor'
  },
  group: String,
  answers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Respuesta'
    }
  ]
},
{
  collection: 'Timestamps',
  timestamps: true
})

const Timestamp = mongoose.model('Timestamp', timestampSchema)

module.exports = Timestamp
