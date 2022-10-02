require("dotenv").config();
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const feedbackSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  question: { type: String, required: true, unique: true },
  value: {
    type: Number,
    default: "0",
  },
  queryText: { type: String },
},{timestamps:true});
const Feedback = new mongoose.model("Feedback", feedbackSchema);

module.exports = Feedback;