const mongoose = require("mongoose");
const User = require("../schema_details/user");
const Schema = mongoose.Schema;

const questionSchema = new Schema({
  question: {
    type: String,
    required: [true, , "Question is required"],
    unique: true,
    minLength: [2, , "Minimum length of question requires"],
  },
  // quesid: { type: Number, unique: true },
  category: { type: String, required: true },
  // correctAnswer: { type: String, required: true }, Marked , save and next,mark for review ke liye
  options: [
    {
      value: {
        type: String,
        required: [true, "Please add option field"],
        minLength: [1, , "Minimum length of option requires"],
      },
      Oid: {
        type: Number,
        required: true,
      },
      isCorrect: {
        default: false,
        type: Boolean,
        // require: true,
      },
    },
  ],
  // flagMark: {
  //   type: Number,
  //   default: 2,
  // },
  // selectedOpt: {
  //   type: String,
  //   default: "",
  // },
});
const Question = new mongoose.model("Question", questionSchema);

module.exports = Question;
