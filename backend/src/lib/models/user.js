const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = Schema({
  name: String,
  lastName: String,
  password: String,
  role: String,
})

module.exports = mongoose.model('User', UserSchema)