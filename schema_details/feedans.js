const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const answerschema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  Qid: { type: Schema.Types.ObjectId, ref: "Feedback" },
  question: { type: String, required: true },
  value: { type: Number, required: true, default: true },
});

const FeedbackAnswer = new mongoose.model("FeedbackAnswer", answerschema);

module.exports = FeedbackAnswer;
