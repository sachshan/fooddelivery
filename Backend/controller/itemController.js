const { addMenuItemService, addCartItemService, placeOrderService } = require('../services/addService');
//add menu item
const addMenuItem = async (req, res) => {
  try {
    // Create the menuItem with request body
    const menuitem = await addMenuItemService(req.body);
    res.redirect(`/refreshmenu?loginname=${req.body.loginname}`);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
//add cart item
const addCartItem = async (req, res) => {
  try {
    // Create the cartItem with request body
    const cartitem = await addCartItemService(req.body, req.session.user);
    res.redirect(`/restaurantDetail?rname=${req.body.restaurantname}#items`);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
//place order
const placeOrder = async (req, res) => {
  try {
    // Create the order with request body
    const order = await placeOrderService(req.body.loginname);
    res.redirect(`/order?loginname=${req.body.loginname}`);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { addMenuItem, addCartItem, placeOrder };