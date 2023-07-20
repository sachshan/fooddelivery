const mongoose = require('mongoose')
const Schema = mongoose.Schema

var CartItem = new Schema({
    cname: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    restaurantname: {
        type: String,
        required: true
    },
    restaurant: {
        type: Schema.Types.ObjectId,
        ref: 'Restaurant',
        required: true
      },
    username: {
        type: String
    },
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    image: {
        type: String,
        default: "/assets/images/item.jpg"
    },
    rimg: {
        type: String,
        default: "/assets/images/order.jpg"
    }
})
  
  
module.exports = mongoose.model('CartItem', CartItem)