const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const UserSchema = new Schema({
  address: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    default: ''
  },
  avatar: {
    type: String,
    default: ''
  }
})

module.exports = User = mongoose.model('users', UserSchema)
