const mongoose = require('mongoose')

const syllabusSchema = new mongoose.Schema({
  nombre: String,
  carrera: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Carrera'
  },
  oid: String
},
{
  collection: 'Planes'
})

const Syllabus = mongoose.model('Plan', syllabusSchema)

module.exports = Syllabus
