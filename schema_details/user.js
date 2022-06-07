require('dotenv').config()
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");


const UserSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 3 },
    email: { type: String, required: true, unique: true },
    studentNum: { type: Number, required: true, unique: true },
    rollNum: { type: Number, required: true, unique: true },
    mobileNum: { type: Number, required: true, maxlength: 10, minlength: 10, unique: true },
    password: { type: String, minlength: 8 },
    year: { type: Number, required: true, min: 1, max: 4 },
    branch: { type: String, required: true },
    gender: { type: String, required: true },
    isHosteler: { type: Boolean, default: false, required: true },
    startTime: { type: Number, required:true},
    hasAppeared: { type: Boolean, default: false },
    isAdmin: { type: Boolean, default: false },
    lang: {type: String}
});


// token generate---------
UserSchema.methods.generateAuthToken = async function () {
  try {
    const pay_load = { _id: this._id };
    const token = jwt.sign(pay_load, process.env.TOKEN_SECRET_KEY);
    // console.log(token);
   // const token_verify = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
   
    return token;
  } catch (err) {
    res.status(400).send(err);
  }
}

// password encryption------------
UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
})

const User = new mongoose.model("User", UserSchema);
module.exports = User;
