const mongoose = require('mongoose')

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
    const now = new Date()
    let visible = null
    if (now >= returnedObject.fechaInicio && now <= returnedObject.fechaFin) {
      visible = true
    } else {
      visible = false
    }
    returnedObject.visible = visible
  }
})

const Form = mongoose.model('Cuestionario', formSchema)

module.exports = Form
