require("dotenv").config()
const mongoose = require("mongoose");
const connectToDB = async () => {
  try {
    console.log(process.env.DB_URI,"line 5")
    await mongoose.connect(process.env.DB_URI);
    console.log("connected")
  } catch (error) {
    console.log("Error in connecting to DB");
  }
};

module.exports = connectToDB;
