const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  phonenumber: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: false,
    enum: ["basic", "admin"],
    default: "basic",
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateBearerToken = function () {
  return jwt.sign(
    {
      id: this._id,
    },
    process.env.TOKEN_SECRET,
    {
      algorithm: "HS256",
      expiresIn: process.env.TOKEN_EXPIRY,
    }
  );
};

const Auth = mongoose.model("Auth", userSchema);

module.exports = { Auth };
