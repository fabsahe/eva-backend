const mongoose = require('mongoose')

const assignmentSchema = new mongoose.Schema({
  profesor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profesor'
  },
  materia: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Materia'
  },
  carrera: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Carrera'
  },
  grupo: String,
  año: String,
  periodo: String,
  alumnos: Number,
  plan: String,
  semestre: Number
},
{
  collection: 'Asignaciones'
})

const Assignment = mongoose.model('Asignacion', assignmentSchema)

module.exports = Assignment
