const mongoose = require('mongoose')
const Schema = mongoose.Schema
const shortid = require('shortid');

const Order = new Schema({
    _id: {
        type: String,
        default: () => shortid.generate({ length: 8 })
      },
    customer: {
      type: Schema.Types.ObjectId,
      ref: 'Customer',
      required: true
    },
    courier: {
        type: Schema.Types.ObjectId,
        ref: 'Courier'
    },
    username: {
        type: String
    },
    image: {
      type: String,
      default: "/assets/images/order.jpg"
    },
    status: {
        type: String,
        default: 'Restaurant is preparing'
    },
    rating: {
        type: Number,
        default: 5
    },
    items: [{
      cname: {
        type: String,
        required: true
      },
      price: {
        type: Number,
        required: true
      },
      restaurantimg: {
        type: String,
        default: "/assets/images/order.jpg"
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
      } 
    }]
  });


  
module.exports = mongoose.model('Order', Order)