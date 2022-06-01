const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    Name: { type: String, required: true, minlength: 3 },
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

const User = new mongoose.model("User",UserSchema);
module.exports = User;
