require("dotenv").config();
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: { type: String, required: true, minlength: 2 },
    email: { type: String, required: true, unique: true },
    studentNum: {
      type: Number,
      required: true,
      unique: true,
      maxLength: [8, "max length is 8"],
    },
    rollNum: {
      type: Number,
      required: true,
      unique: true,
      minLength: [13, "min length is 13"],
      maxLength: [13, "max length is 13"],
    },
    mobileNum: {
      type: Number,
      required: true,
      maxLength: 10,
      minLength: 10,
      unique: true,
    },
    password: { type: String },
    year: {
      type: Number,
      required: true,
      min: 1,
      max: 4,
    },
    branch: {
      type: String,
      required: true,
    },
    domain: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    isHosteler: {
      type: Boolean,
      default: false,
      required: true,
    },
    hasAppeared: {
      type: Boolean,
      default: false,
    },
    loginAt: {
      type: Date,
      default: null,
    },
    logoutAt: {
      type: String,
      default: null,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    lang: { type: String },
    userNumCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const User = new mongoose.model("User", UserSchema);
module.exports = User;