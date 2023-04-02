const mongoose = require('mongoose')

const instituteSchema = new mongoose.Schema({
  codigo: String,
  nombre: String
},
{
  collection: 'Institutos'
})

const Institute = mongoose.model('Instituto', instituteSchema)

module.exports = Institute
