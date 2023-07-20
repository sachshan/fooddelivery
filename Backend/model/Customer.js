const mongoose = require('mongoose')
const Schema = mongoose.Schema

var Customer = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    }
})
  
  
module.exports = mongoose.model('Customer', Customer)