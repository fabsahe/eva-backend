const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true
  },
  name: String,
  passwordHash: String,
  forms: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cuestionario'
  }]
},
{
  collection: 'Usuarios'
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

const User = mongoose.model('Usuario', userSchema)

module.exports = User
