require('dotenv').config()
const app = require('./src/app')
const consola = require('consola')

const PORT = process.env.PORT || 3000

app.listen(PORT, function () {
  consola.success(`Servidor listo en: http://localhost:${PORT}`)
})
