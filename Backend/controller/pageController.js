const Customer = require("../model/Customer");
const Courier = require("../model/Courier");
const Restaurant = require("../model/Restaurant");
const MenuItem = require("../model/MenuItem");
const CartItem = require("../model/CartItem");
const Order = require("../model/Order");
//get pages and passing with variables needed
const orderPage = async (req, res) => {
  try {
    const loginname = req.query.loginname;
    const customer = await Customer.findOne({ username: loginname });
    const orders = await Order.find({ customer: customer._id }).populate("items.restaurant");
    res.render("Order", { loginname: loginname, orders: orders });
  } catch (err) {
    console.log(err);
    res.status(500).send("An error occurred while retrieving the orders.");
  }
};

const homePage = async (req, res) => {
  res.render('Home');
};

const courierOrderPage = async function (req, res) {
  try {
    const loginname = req.query.loginname;
    const courier = await Courier.findOne({ username: loginname });
    const orders = await Order.find({
      $or: [
        { status: "Waiting for courier" },
        { courier: courier._id, status: { $in: ["Delivered", "On the way"] } }
      ]
    }).populate("items.restaurant");
    res.render("CourierOrder", { loginname: loginname, orders: orders });
  } catch (err) {
    console.log(err);
    res.status(500).send("An error occurred while retrieving the orders.");
  }
};

const restaurantDashboard = async function (req, res) {
  try {
    const loginname = req.query.loginname;
    const restaurant = await Restaurant.findOne({ username: loginname });
    const menuItems = await MenuItem.find({ restaurant: restaurant._id });
    const orders = await Order.find({ "items.restaurant": restaurant._id, status: "Restaurant is preparing" });
    res.render("RDashboard", { loginname: loginname, menuItems: menuItems, orders: orders });
  } catch (err) {
    console.log(err);
    res.status(500).send("An error occurred while retrieving the menu items.");
  }
};

const restaurantPage = (req, res) => {
  const loginname = req.session.user.username;

  Restaurant.find({})
    .then(restaurants => {
      res.render('Restaurant', { restaurants, loginname: loginname }); // Render the restaurants view and pass the retrieved restaurants as a variable
    })
    .catch(error => {
      console.log(error);
      res.status(500).send('An error occurred while retrieving the restaurants.');
    });
};

const cartPage = async function (req, res) {
  try {
    const loginname = req.query.loginname;
    const customer = await Customer.findOne({ username: loginname });
    const cartitems = await CartItem.find({ customer: customer._id }).populate('restaurant');
    res.render("Cart", { loginname: loginname, cartitems: cartitems });
  } catch (err) {
    console.log(err);
    res.status(500).send("An error occurred while retrieving the cart items.");
  }
};

const loginPage = function (req, res) {
  res.render("Login");
};

const courierRegisterPage = function (req, res) {
  res.render("CourierRegister");
};

const restaurantRegisterPage = function (req, res) {
  res.render("MerchantRegister");
};

const RegisterPage = function (req, res) {
  res.render("Register");
};

//search methods for restaurant with reg expressions
const searchRestaurant = async (req, res) => {
  try {
    const keyword = req.query.keyword;
    const loginname = req.session.user.username;

    // perform the database search for restaurants that match the keyword
    const query = {
      $or: [
        { rname: { $regex: keyword, $options: 'i' } }, // match restaurant name (case-insensitive)
        { tag1: { $regex: keyword, $options: 'i' } }, // match tag1 (case-insensitive)
        { tag2: { $regex: keyword, $options: 'i' } }, // match tag2 (case-insensitive)
        { desc: { $regex: keyword, $options: 'i' } } // match description (case-insensitive)
      ]
    };
    const restaurants = await Restaurant.find(query);

    // render the search results using the Search.ejs template
    res.render('Search', { restaurants, loginname: loginname, keyword: keyword  });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};

const restaurantDetail = function(req, res) {
  var rname = req.query.rname; // Get the name of the selected restaurant from the request query string
  
  const loginname = req.session.user.username;

  Restaurant.findOne({ rname: rname })
    .then(restaurant => {
      // Find all menu items that belong to the selected restaurant
      MenuItem.find({ restaurantname: rname })
        .then(items => {
          res.render('RestaurantDetail', { restaurant: restaurant, items: items, loginname:loginname });
        })
        .catch(err => {
          console.log(err);
          res.status(500).send('An error occurred while retrieving the menu items.');
        });
    })
    .catch(err => {
      console.log(err);
      res.status(500).send('An error occurred while retrieving the restaurant details.');
    });
};

module.exports = { RegisterPage, restaurantRegisterPage, courierRegisterPage, loginPage, orderPage, homePage, courierOrderPage, restaurantDashboard, restaurantPage, searchRestaurant, restaurantDetail, cartPage };