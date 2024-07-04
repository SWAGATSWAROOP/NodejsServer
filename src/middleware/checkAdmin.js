const { Auth } = require("../models/auth.js");

const checkAdmin = async (req, res, next) => {
  try {
    const userid = req.userid;
    console.log(userid);
    const user = await Auth.findById(userid).select("-password");
    console.log(user);
    if (user.role !== "admin") {
      return res.status(400).json({ messgae: "User is not admin" });
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { checkAdmin };
