const loginService = require("../services/loginService");
//login
const login = async function(req, res) {
  try {
    //authentication
    const { username, password } = req.body;
    const userType = await loginService.authenticateUser(username, password);
    if (!userType) {
      return res.status(400).send(`Username or password is incorrect`);
    }
    //save current login user as the session user
    req.session.user = { username, type: userType };
    //show different dashboards based on user type
    switch (userType) {
      case "customer":
        return res.redirect(`/order?loginname=${username}`);
      case "restaurant":
        return res.redirect(`/rdashboard?loginname=${username}`);
      case "courier":
        return res.redirect(`/corder?loginname=${username}`);
      default:
        return res.status(400).send(`Unknown user type: ${userType}`);
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { login };
