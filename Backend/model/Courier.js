const mongoose = require('mongoose')
const Schema = mongoose.Schema

var Courier = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
})
  
  
module.exports = mongoose.model('Courier', Courier)