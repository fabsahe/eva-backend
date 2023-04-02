const mongoose = require('mongoose')
const consola = require('consola')

const connectDB = async () => {
  mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
    .then(() => {
      consola.success('Base de datos de MongoDB conectada')
    })
    .catch(error => {
      consola.error(error)
    })
}

module.exports = connectDB
