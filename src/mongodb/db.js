const mongoose = require("mongoose");

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
  } catch (error) {
    console.log("Error in connecting to DB");
  }
};

module.exports = connectToDB;
