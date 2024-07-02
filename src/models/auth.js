const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      index: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

authSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

authSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

authSchema.methods.generateBearerToken = function () {
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

const Auth = mongoose.model("Auth", authSchema);

module.exports = { Auth };
