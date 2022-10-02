const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const answerschema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  Quserid: { type: Schema.Types.ObjectId, ref: "Feedback" },
  // question: { type: String, required: true },
  // value: { type: Number, required: true, default: true },
  response: [
    {
      question: {
        type: String,
        required: true,
      },
      value: {
        type: Number,
        required: true,
        default: 0,
      },
      Qid: {
        type: String,
        required: true,
      },
    },
  ],
  feedtext: {
    type: String,
    required: true,
  },
},{timestamps:true});

const FeedbackAnswer = new mongoose.model("FeedbackAnswer", answerschema);

module.exports = FeedbackAnswer;