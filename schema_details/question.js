require("dotenv").config();
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const questionSchema = new Schema({
  question: { type: String, required: true },
  category: { type: String, required: true },
  optionType: { type: String, required: true },
  iscorrect: { type: Boolean, default: false },
  //   options: [{ key: Number, value: String }],
  //   correctAnswer: [{ type: String, required: true }],
  //   questionset_id: { type: Number, required: true },
  //   question_id: { type: Number, required: true },
});

const Question = new mongoose.model("Question", questionSchema);

module.exports = Question;
