const mongoose = require('mongoose')

const versionSchema = new mongoose.Schema({
  code: String,
  current: Boolean
},
{
  collection: 'Versions'
})

const Version = mongoose.model('Version', versionSchema)

module.exports = Version
