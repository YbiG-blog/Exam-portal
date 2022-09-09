const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const answerSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  Qid: { type: Schema.Types.ObjectId, ref: "Question" },
  question: { type: String, required: true },
  category: { type: String, required: true },
  userAnswer: { type: Number, default: 200},
  isCorrect: { type: Boolean, default: false },
  //ch
  ansid: {
    type: Number,
    default: 2,
  },
  selectedOpt: {
    type: String,
    default: "",
  },
});

const Answer = new mongoose.model("Answer", answerSchema);

module.exports = Answer;

// 1 -> if question answered
// 3 -> if mark for review and answered
// 2 -> not answered
// 4 -> mark and not answered
