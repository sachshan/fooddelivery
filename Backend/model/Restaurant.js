const mongoose = require('mongoose')
const Schema = mongoose.Schema

var Restaurant = new Schema({
    username: {
        type: String,
        required: true
    },
    rname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    hours: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    icon: {
        type: Number
    },
    image: {
        type: String,
        default: "/assets/images/order.jpg"
    },
    tag1: {
        type: String,
        default: "tag1"
    },
    tag2: {
        type: String,
        default: "tag2"
    },
    rating: {
        type: Number,
        default: 5
    },
    desc: {
        type: String,
        default: "Non enim praesent elementum facilisis leo vel fringilla. Lectus proin nibh nisl condimentum id. Quis varius quam quisque id diam vel."
    }
})

  
module.exports = mongoose.model('Restaurant', Restaurant)