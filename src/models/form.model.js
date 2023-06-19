const mongoose = require('mongoose')
const moment = require('moment-timezone')

const formSchema = new mongoose.Schema({
  title: String,
  year: String,
  period: String,
  careers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Carrera'
    }
  ],
  questions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Pregunta'
    }
  ],
  answersNumber: Number,
  startDate: Date,
  endDate: Date,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario'
  }
},
{
  collection: 'Cuestionarios'
})

formSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    const now = moment()
    const startDate = moment.tz(returnedObject.startDate, 'America/Mexico_City')
    const endDate = moment.tz(returnedObject.endDate, 'America/Mexico_City')

    let visible = null
    if (now >= startDate && now <= endDate) {
      visible = true
    } else {
      visible = false
    }
    returnedObject.visible = visible
  }
})

const Form = mongoose.model('Cuestionario', formSchema)

module.exports = Form
