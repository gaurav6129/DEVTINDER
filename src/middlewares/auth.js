const jwt = require("jsonwebtoken");
const User = require("../models/user");
userAuth = async (req, res, next) => {
  //Read the token from request cookie
  try {
    const { token } = req.cookies;
    if (!token) {
      throw new Error("Invalid token");
    }
    const decodedObj = await jwt.verify(token, "DEV@Tinder$790");
    const { _id } = decodedObj;
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User does not exist");
    }
    req.user = user;
      next();
    
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
  //Validate the token
  //Find the user
};

module.exports = {
  userAuth,
};
