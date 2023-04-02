const mongoose = require('mongoose')

const professorSchema = new mongoose.Schema({
  nombre: String,
  correo: String,
  nivel: Number,
  grado: String,
  tipo: Number,
  instituto: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Instituto'
  },
  carrera: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Carrera'
  }
},
{
  collection: 'Profesores'
})

const Professor = mongoose.model('Profesor', professorSchema)

module.exports = Professor
