const Customer = require("../model/Customer");
const Courier = require("../model/Courier");
const Restaurant = require("../model/Restaurant");
const User = require("../model/User");
const Order = require("../model/Order");
//update information for customer
async function updateCustomer(loginname, password, email, address) {
  try {
    const customer = await Customer.findOne({ username: loginname });
    const user = await User.findOne({ username: loginname });

    user.password = password || user.password;
    customer.email = email || customer.email;
    customer.address = address || customer.address;

    await customer.save();
    await user.save();

    return { status: 200, message: 'Update successful' };
  } catch(error) {
    return { status: 500, error: error.message };
  }
}
//update information for courier
async function updateCourier(loginname, password, email) {
  try {
    const courier = await Courier.findOne({ username: loginname });
    const user = await User.findOne({ username: loginname });

    courier.email = email || courier.email;
    user.password = password || user.password;

    await courier.save();
    await user.save();

    return { status: 200, message: 'Update successful' };
  } catch(error) {
    return { status: 500, error: error.message };
  }
}
//update information for restaurant
async function updateRestaurant(loginname, password, email, rname, hours, address, rimg) {
  try {
    const restaurant = await Restaurant.findOne({ username: loginname });
    const user = await User.findOne({ username: loginname });

    restaurant.rname = rname || restaurant.rname;
    user.password = password || user.password;
    restaurant.email = email || restaurant.email;
    restaurant.hours = hours || restaurant.hours;
    restaurant.address = address || restaurant.address;
    restaurant.image = rimg || restaurant.image;

    await restaurant.save();
    await user.save();

    return { status: 200, message: 'Update successful' };
  } catch(error) {
    return { status: 500, error: error.message };
  }
}

module.exports = { updateCustomer, updateCourier, updateRestaurant };