const Customer = require("../model/Customer");
const Restaurant = require("../model/Restaurant");
const MenuItem = require("../model/MenuItem");
const CartItem = require("../model/CartItem");
const Order = require("../model/Order");

//add menu item
const addMenuItemService = async (body) => {
  const restaurant = await Restaurant.findOne({ username: body.loginname });
  const existingMenuItem = await MenuItem.findOne({ iname: body.iname, restaurant: restaurant._id });
  
  if (existingMenuItem) {
    throw new Error('Item already exists in menu');
  }

  const menuitem = await MenuItem.create({
    iname: body.iname,
    price: body.price,
    desc: body.desc,
    restaurantname: restaurant.rname,
    restaurant: restaurant._id,
    username: body.loginname,
    image: body.iimg,
    rimg: body.rimg
  });
  
  return menuitem;
};

//add item to cart
const addCartItemService = async (body, sessionUser) => {
  const customer = await Customer.findOne({ username: sessionUser.username });
  const restaurant = await Restaurant.findOne({ rname: body.restaurantname });
  
  const existingCartItems = await CartItem.find({ customer: customer._id }).populate('restaurant');
  for (const existingCartItem of existingCartItems) {
    if (!existingCartItem || !existingCartItem.restaurant) {
      continue;
    }

    if (existingCartItem.restaurant._id.toString() !== restaurant._id.toString()) {
      throw new Error(`You can't add item from other restaurant.`);
    }
  }

  const cartitem = await CartItem.create({
    cname: body.iname,
    price: body.price,
    desc: body.desc,
    restaurantname: body.restaurantname,
    restaurant: restaurant,
    username: sessionUser.username,
    customer: customer._id,
    image: body.iimg,
    rimg: restaurant.image
  });

  const menuItems = await MenuItem.find({ restaurantname: body.restaurantname });
  return { restaurant, menuItems };
};

//place the order
const placeOrderService = async (body) => {
  const customer = await Customer.findOne({ username: body });
  const cartitems = await CartItem.find({ customer: customer._id }).populate('restaurant');

  if(cartitems.length === 0){
    throw new Error('Your cart is empty!');
  }

  const order = new Order({
    customer: customer._id,
    status: "Restaurant is preparing",
    username: body.loginname,
    items: cartitems.map(item => ({
      cname: item.cname,
      price: item.price,
      desc: item.desc,
      restaurantname: item.restaurantname,
      restaurant: item.restaurant,
      restaurantimg: item.rimg
    }))
  });

  await order.save();
  await CartItem.deleteMany({ customer: customer._id });

  return order;
};

module.exports = { addMenuItemService, addCartItemService, placeOrderService };
