const { Schema, model } = require("mongoose");

const recentUploadSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  time: {
    type: String,
    required: true,
  },
});

const companySchema = new Schema({
  portfoliocompanyname: {
    type: String,
    index: true,
    required: true,
  },
  capitalinvested: {
    type: Number,
  },
  companyindustrycategory: {
    type: String,
    enum: ["Technology", "Healthcare", "Fintech", "Other"],
  },
  companylogo: {
    type: String,
  },
  investmentdate: {
    type: Date,
  },
  currentvaluation: {
    type: Number,
  },
  anyrecentexit: {
    type: Number,
    default: "",
  },
  recentdocumentuploads: [recentUploadSchema],
});

const Company = new model("Company", companySchema);

module.exports = { Company };
