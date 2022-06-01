const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 3 },
    email: { type: String, required: true, unique: true },
    rollnum: { type: Number, required: true, unique: true },
    mobileNumber: { type: String, required: true, maxlength: 10, minlength: 10, unique: true },
    password: { type: String, minlength: 8 },
    year: { type: Number, required: true, min: 1, max: 4 },
    branch: { type: String, required: true },
    gender: { type: String, required: true },
    isverified: { type: Boolean, default: false },
    otp_val: { type: Number }
});

UserSchema.pre("save", async function(next){
    if(this.isModified("password")){
      this.password= await bcrypt.hash(this.password,saltRounds);
    }
    next();
  })

const User = new mongoose.model("User",UserSchema);
module.exports = User;
