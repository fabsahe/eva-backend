const mongoose = require('mongoose')

const formSchema = new mongoose.Schema({
  titulo: String,
  año: String,
  periodo: String,
  carreras: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Carrera'
    }
  ],
  preguntas: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Pregunta'
    }
  ],
  fechaInicio: Date,
  fechaFin: Date,
  usuario: {
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
