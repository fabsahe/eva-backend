const mongoose = require('mongoose')

const careerSchema = new mongoose.Schema({
  codigo: String,
  nombre: String,
  siglas: String,
  instituto: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Instituto'
  },
  codigoInstituto: String
},
{
  collection: 'Carreras'
})

const Career = mongoose.model('Carrera', careerSchema)

module.exports = Career
