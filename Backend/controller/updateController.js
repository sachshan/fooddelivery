const Courier = require("../model/Courier");
const Order = require("../model/Order");
const { updateCustomer, updateCourier, updateRestaurant, updateOrderDone, updateOrderOntheway, updateOrderDelivered } = require('../services/updateService');
//update information for different user types
const update = async (req, res) => {
  const { loginname, password, email, address } = req.body;
  const result = await updateCustomer(loginname, password, email, address);
  res.status(200).render("Login");
};

const cupdate = async (req, res) => {
  const { loginname, password, email } = req.body;
  const result = await updateCourier(loginname, password, email);
  res.status(200).render("Login");
};

const mupdate = async (req, res) => {
  const { loginname, password, email, rname, hours, address, rimg } = req.body;
  const result = await updateRestaurant(loginname, password, email, rname, hours, address, rimg);
  res.status(200).render("Login");
};

//update order status
  const updateDone = async (req, res) => {
    try {
      const orderId = req.body.orderid;
      const loginname = req.body.loginname;
    //find all the orders under the logged in restaurant
      const order = await Order.findById(orderId);
    
      if (!order) {
        return res.status(404).send('Order not found');
      }
    
      order.status = 'Waiting for courier';
      await order.save();
    
      res.redirect(`/rdashboard?loginname=${loginname}`);
    } catch (error) {
      console.error(error);
      res.status(500).send('An error occurred while updating the order status');
    }
    };


const updateOntheway = async (req, res) => {
        try {
          const orderId = req.body.orderid;
          const loginname = req.body.loginname;
          const courier = await Courier.findOne({username: loginname});
        //find all the orders under the logged in courier
          const order = await Order.findById(orderId);
        
          if (!order) {
            return res.status(404).send('Order not found');
          }
        
          order.status = 'On the way';
          order.courier = courier;
          await order.save();
        
          res.redirect(`/corder?loginname=${loginname}`);
        } catch (error) {
          console.error(error);
          res.status(500).send('An error occurred while updating the order status');
        }
        };

    const updateDelivered = async (req, res) => {
            try {
              const orderId = req.body.orderid;
              const loginname = req.body.loginname;
              const courier = await Courier.findOne({username: loginname});
            //find all the orders under the logged in courier
              const order = await Order.findById(orderId);
            
              if (!order) {
                return res.status(404).send('Order not found');
              }
            
              order.status = 'Delivered';
              order.courier = courier;
              await order.save();
            
              res.redirect(`/corder?loginname=${loginname}`);
            } catch (error) {
              console.error(error);
              res.status(500).send('An error occurred while updating the order status');
            }
            }
            
  module.exports = { update, cupdate, mupdate, updateDone, updateOntheway, updateDelivered };