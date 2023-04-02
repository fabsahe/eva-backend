const mongoose = require('mongoose')

const subjectSchema = new mongoose.Schema({
  nombre: String,
  semestre: Number,
  carrera: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Carrera'
  },
  nombrePlan: String,
  plan: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Plan'
  },
  oid: String
},
{
  collection: 'Materias'
})

const Subject = mongoose.model('Materia', subjectSchema)

module.exports = Subject
