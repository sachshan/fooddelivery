const express = require('express');
const router = express.Router();
const Order = require("../model/Order");
const Restaurant = require("../model/Restaurant");
const { RegisterPage, restaurantRegisterPage, courierRegisterPage, loginPage, homePage, orderPage, courierOrderPage, restaurantDashboard, restaurantPage, searchRestaurant, restaurantDetail, cartPage } = require('../controller/pageController');
const { refreshOrder, refreshMenu } = require('../controller/refreshController');
const { login } = require('../controller/loginController');
const { deleteMenu, deleteCart } = require('../controller/deleteController');
const { register, mregister, cregister } = require('../controller/registerController');
const { addMenuItem, addCartItem, placeOrder } = require('../controller/itemController');
const { update, cupdate, mupdate, updateDone, updateOntheway, updateDelivered } = require('../controller/updateController');




//=====================

//CHAT PORTAL

//=====================




const nodemailer = require('nodemailer');




router.get('/chat', async (req,res)=>{




const min = 1;

const max = 100000;

const randomInt = Math.floor(Math.random() * (max - min + 1)) + min;




const { rname, loginname, email } = req.query;

res.redirect(`http://localhost:3000/?username=${loginname}&room=${randomInt}`);




const transporter = nodemailer.createTransport({

  service: 'gmail',

  auth: {

      user: 'randyshaw1882@gmail.com',

      pass: 'ndbngutotvfouvia'

  }

});



const mailOptions = {

  from: 'randyshaw1882@gmail.com',

  to: email,

  subject: 'Link to your chat',

  html: `${loginname} invites you to a chat! Click <a href="http://localhost:3000/?username=${rname}&room=${randomInt}">here</a> to join the chat.`

  };



  transporter.sendMail(mailOptions, function(error, info){

if (error) {

  console.log(error);

  res.send('An error occurred while sending email');

  } else {

  console.log('Email sent: ' + info.response);

  res.send('Email sent successfully');

  }

});

});

//=====================
//GET PAGES
//=====================

router.get('/home', homePage);

router.get('/order', orderPage);

router.get("/corder", courierOrderPage);

router.get("/rdashboard", restaurantDashboard);

router.get('/restaurant', restaurantPage);

router.get('/search', searchRestaurant);

router.get('/restaurantdetail', restaurantDetail);

router.get("/cart", cartPage);

router.get("/cregister", courierRegisterPage);

router.get("/mregister", restaurantRegisterPage);

router.get("/register", RegisterPage);


//=====================
//REFRESH ORDER PAGE
//=====================

router.post("/order", refreshOrder);

//=====================
//AGGREGATE
//=====================

async function updateRestaurantRatings() {
  const orders = await Order.find({}).populate('items.restaurant');
const restaurantRatings = {};

orders.forEach((order) => {
  const restaurant = order.items[0].restaurant;
  if (!restaurantRatings[restaurant.username]) {
    restaurantRatings[restaurant.username] = {
      totalRating: order.rating,
      count: 1,
    };
  } else {
    restaurantRatings[restaurant.username].totalRating += order.rating;
    restaurantRatings[restaurant.username].count++;
  }
});

for (const [restaurantName, ratingData] of Object.entries(restaurantRatings)) {
  const avgRating = ratingData.totalRating / ratingData.count;
  const restaurant = await Restaurant.findOneAndUpdate(
    { username: restaurantName },
    { rating: avgRating },
    { new: true }
  );
}
};

router.post('/rating', async (req, res) => {
  try {
    // retrieve the rating value and order ID from the form data
    const { rating, orderID } = req.body;
    
    // update the order's rating field in the database
    await Order.updateOne({ _id: orderID }, { rating: rating });
    
    // send a response indicating that the rating was successfully updated
    updateRestaurantRatings();
    res.status(200).json({ message: 'Rating updated successfully!' });
  } catch (err) {
    // handle any errors that may occur during the update process
    console.error(err);
    res.status(500).json({ message: 'An error occurred while updating the rating.' });
  }
});


//=====================
//SIGN UP
//=====================



// Handling user signup
router.post("/register", register);

// Handling merchant signup
router.post("/mregister", mregister);

// Handling courier signup
router.post("/cregister", cregister);

//=====================
//ADD MENU ITEM
//=====================

router.post("/menuitem", addMenuItem);

router.get('/refreshmenu', refreshMenu);

//=====================
//ADD CART ITEM
//=====================

router.post("/addtocart", addCartItem);

//=====================
//DELETE
//=====================

//handling delete menuitem
router.post('/deletemenu', deleteMenu);

router.post('/deletecart', deleteCart);

//=====================
//PLACE ORDER
//=====================

router.post('/placeorder', placeOrder);

//=====================
//UPDATE
//=====================

//handling customer update information
router.post("/update", update);

//handling courier update information
router.post("/cupdate", cupdate);

//handling merchant update information
router.post("/mupdate", mupdate);

//=====================
//LOGIN
//=====================


//Showing login form
router.get("/login", loginPage);

//Handling user login
router.post("/login", login);

//=====================
//UPDATE ORDER STATUS
//=====================

router.post('/orderdone', updateDone);

router.post('/ontheway', updateOntheway);

router.post('/delivered', updateDelivered);

module.exports = router;
