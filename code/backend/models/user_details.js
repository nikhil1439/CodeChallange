const mongoose = require('mongoose')
const empSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  email: {
   type: String,
   required: true
  }
})
const Emp = module.exports = mongoose.model('Emp', empSchema)