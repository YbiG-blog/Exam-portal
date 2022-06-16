const mongoose = require("mongoose");
const User = require("../schema_details/user");
const Schema = mongoose.Schema;

const questionSchema = new Schema({
  question: { type: String, required: true, unique: true },
  // quesid: { type: Number, unique: true },
  category: { type: String, required: true },
  // correctAnswer: { type: String, required: true },
  options: [
    {
      value: {
        type: String,
        required: true,
      },
      Oid: {
        type: Number,
        required: true,
      },
      isCorrect: {
        default: false,
        type: Boolean,
        require: true,
      },
    },
  ],
});
const Question = new mongoose.model("Question", questionSchema);

module.exports = Question;
