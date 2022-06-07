require('dotenv').config()
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
/*const instructionLangSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  language: { type: String, required: true }
})*/
const feedbackSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  question1: { type: Number, required: true, min: 1, max: 5 },
  question2: { type: Number, required: true, min: 1, max: 5 },
  question3: { type: Number, required: true, min: 1, max: 5 },
  question4: { type: Number, required: true, min: 1, max: 5 },
  queryText: { type: String, required: true }
})

//const Language = new mongoose.model("Language", instructionLangSchema);
const Feedback = new mongoose.model("Feedback", feedbackSchema);
//const Ins_Feed = {  Feedback };

module.exports =Feedback;