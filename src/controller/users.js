const { Auth } = require("../models/auth.js");
const { sendMail } = require("../utils/mailService.js");

const getAllUsers = async (_, res) => {
  try {
    const users = await Auth.find().select("-password");
    return res.status(200).json(users);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error");
  }
};

const inviteUsers = async (req, res) => {
  try {
    const { email } = req.body;
    sendMail(email);
    res.status(200).json({ message: "Message Sent Successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

module.exports = { getAllUsers, inviteUsers };
