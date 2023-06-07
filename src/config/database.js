const mongoose = require('mongoose')
const consola = require('consola')

const connectDB = async () => {
  mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
    .then((con) => {
      consola.success(`Base de datos de MongoDB conectada a: ${con.connection.host}`)
    })
    .catch(error => {
      consola.error(error)
    })
}

module.exports = connectDB
