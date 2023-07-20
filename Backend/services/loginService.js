const User = require("../model/User");

//user authentication while logging in
const authenticateUser = async (username, password) => {
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return null;
    }
    const passwordMatch = password === user.password;
    if (!passwordMatch) {
      return null;
    }
    return user.type;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { authenticateUser };