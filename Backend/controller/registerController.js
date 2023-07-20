const { createCustomer, createRestaurant, createCourier } = require('../services/registerService');
const User = require("../model/User");

//registration for different type of users
const register = async (req, res) => {
  try {
    //avoid duplicate username
    const existedUser = await User.findOne({ username: req.body.username });
    if (existedUser) {
      return res.status(400).send("Username already exists");
    }
    const user = await createCustomer(req.body, {
      email: req.body.email,
      address: req.body.address,
    });
    return res.status(200).render("Login");
  } catch (err) {
    console.log(err);
    return res.status(500).send("You are missing required fields");
  }
};

const mregister = async (req, res) => {
  try {
    //avoid duplicate username
    const existedUser = await User.findOne({ username: req.body.username });
    if (existedUser) {
      return res.status(400).send("Username already exists");
    }
    const user = await createRestaurant(req.body, {
      rname: req.body.rname,
      hours: req.body.hours,
      email: req.body.email,
      address: req.body.address,
      rimg: req.body.rimg,
    });
    return res.status(200).render("Login");
  } catch (err) {
    console.log(err);
    return res.status(500).send("You are missing required fields");
  }
};

const cregister = async (req, res) => {
  try {
    //avoid duplicate username
    const existedUser = await User.findOne({ username: req.body.username });
    if (existedUser) {
      return res.status(400).send("Username already exists");
    }
    const user = await createCourier(req.body, { email: req.body.email });
    return res.status(200).render("Login");
  } catch (err) {
    console.log(err);
    return res.status(500).send("You are missing required fields");
  }
};

module.exports = { register, mregister, cregister };