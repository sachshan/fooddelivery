const Customer = require("../model/Customer");
const Courier = require("../model/Courier");
const Restaurant = require("../model/Restaurant");
const User = require("../model/User");
//register for customer
const createCustomer = async (userData, customerData) => {
  const user = await User.create({
    username: userData.username,
    password: userData.password,
    type: "customer",
  });
  const customer = await Customer.create({
    username: userData.username,
    email: customerData.email,
    address: customerData.address,
  });

  return user;
};
//register for restaurant
const createRestaurant = async (userData, restaurantData) => {
  const user = await User.create({
    username: userData.username,
    password: userData.password,
    type: "restaurant",
  });
  const restaurant = await Restaurant.create({
    username: userData.username,
    rname: restaurantData.rname,
    email: restaurantData.email,
    hours: restaurantData.hours,
    address: restaurantData.address,
    image: restaurantData.rimg,
  });

  return user;
};
//register for courier
const createCourier = async (userData, courierData) => {
  const user = await User.create({
    username: userData.username,
    password: userData.password,
    type: "courier",
  });
  const courier = await Courier.create({
    username: userData.username,
    email: courierData.email,
  });

  return user;
};

module.exports = { createCustomer, createRestaurant, createCourier };
