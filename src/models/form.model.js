const mongoose = require('mongoose')
const dayjs = require('dayjs')

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
    const now = dayjs()
    const startDateUTC = dayjs(returnedObject.startDate)
    const endDateUTC = dayjs(returnedObject.endDate)
    const startDate = startDateUTC.subtract(6, 'hour')
    const endDate = endDateUTC.subtract(6, 'hour')

    /* timezone test */
    console.log('NOW = ', now)
    console.log('START_DATE_ORIGINAL = ', returnedObject.startDate)
    console.log('END_DATE_ORIGINAL = ', returnedObject.endDate)
    console.log('START_DATE_DAYJS = ', startDate)
    console.log('END_DATE_DAYJS = ', endDate)
    console.log('===================')

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
