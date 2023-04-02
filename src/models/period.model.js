const mongoose = require('mongoose')

const periodSchema = new mongoose.Schema({
  año: String,
  nombres: [{
    type: String
  }],
  actual: Number
},
{
  collection: 'Periodos'
})

const Period = mongoose.model('Periodo', periodSchema)

module.exports = Period
