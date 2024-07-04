const jwt = require("jsonwebtoken");

const checkToken = async (req, res, next) => {
  try {
    const token = req.headers["authorization"] || req.headers["Authorization"];
    if (!token) {
      return res.status(400).json({ message: "No token provided" });
    }
    const bearerToken = token.split(" ")[1];
    const decoded = jwt.verify(bearerToken, process.env.TOKEN_SECRET);
    req.userid = decoded.id;
    console.log("UserID set in req:", req.userid);
    next();
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Invalid Token" });
  }
};

module.exports = { checkToken };
