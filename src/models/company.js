import { Schema, model } from "mongoose";

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
    required: true,
  },
  companyindustrycategory: {
    type: String,
    enum: ["Technology", "Healthcare", "Fintech", "Other"],
    required: true,
  },
  companylogo: {
    type: String,
    required: true,
  },
  investmentdate: {
    type: Date,
    required: true,
  },
  currentvaluation: {
    type: Number,
    required: true,
  },
  anyrecentexit: {
    type: Number,
    default: "",
  },
  recentdocumentuploads: [recentUploadSchema],
});

export const Company = new model("Company", companySchema);
