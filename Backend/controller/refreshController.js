const { refreshOrderService, refreshMenuService } = require('../services/refreshService');
//refresh pages
const refreshOrder = async function (req, res) {
  try {
    const url = await refreshOrderService(req.body.loginname);
    res.redirect(url);
  } catch (err) {
    console.log(err);
    res.status(500).send("An error occurred while retrieving the orders.");
  }
};

const refreshMenu = async (req, res) => {
  try {
    const url = await refreshMenuService(req.query.loginname);
    res.redirect(url);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { refreshOrder, refreshMenu };