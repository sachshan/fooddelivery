const MenuItem = require("../model/MenuItem");
const CartItem = require("../model/CartItem");

//delete menu item
const deleteMenuItem = async (itemId) => {
  try {
    await MenuItem.findOneAndDelete({ _id: itemId });
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

//delete cart item
const deleteCartItem = async (cartItemId) => {
  try {
    await CartItem.findOneAndDelete({ _id: cartItemId });
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

module.exports = { deleteMenuItem, deleteCartItem };