const mongoose = require('mongoose')
const consola = require('consola')

const username = process.env.MONGODB_USERNAME
const password = encodeURIComponent(process.env.MONGODB_PASSWORD)
const endpoint = process.env.MONGODB_ENDPOINT
const uri = `mongodb://${username}:${password}@${endpoint}`

const connectDB = async () => {
  mongoose.connect(process.env.MONGODB_URI || uri, {
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
