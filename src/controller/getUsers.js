const { Auth } = require("../models/auth.js");

const getAllUsers = async (_, res) => {
  try {
    const users = await Auth.find().select("-password");
    return res.status(200).json(users);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error");
  }
};

module.exports = { getAllUsers };
