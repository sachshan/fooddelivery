const { deleteMenuItem, deleteCartItem } = require("../services/deleteService");
//delete menu item
const deleteMenu = async (req, res) => {
    try {
      // Find and delete the menuItem
      const success = await deleteMenuItem(req.body.itemid);

      if (success) {
      res.redirect(`/refreshmenu?loginname=${req.body.loginname}`);
    } 
    } catch (err) {
      console.log(err)
    }
  };
//delete cart item
  const deleteCart = async (req, res) => {
    try {
      // Find and delete the cartItem
      const success = await deleteCartItem(req.body.cartitemid);
      if (success) {
      res.redirect(`/cart?loginname=${req.body.loginname}`);
      }
    } catch (err) {
      console.log(err)
    }
  };

  module.exports = { deleteMenu, deleteCart };