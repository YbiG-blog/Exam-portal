const mongoose = require("mongoose");
const User = require("../schema_details/user");
const Schema = mongoose.Schema;

const questionSchema = new Schema({
  question: { type: String, required: true, unique: true },
  // quesid: { type: Number, unique: true },
  category: { type: String, required: true },
  // correctAnswer: { type: String, required: true }, Marked , save and next,mark for review ke liye
  options: [
    {
      value: {
        type: String,
        required: [true, "Please add option field"],
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
  flagMark: {
    type: Number,
    default: 2,
  },
  selectedOpt: {
    type: String,
    default: "",
  },
});
const Question = new mongoose.model("Question", questionSchema);

module.exports = Question;
