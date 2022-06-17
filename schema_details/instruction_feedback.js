require("dotenv").config();
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const feedbackSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  question: { type: String, required: true, unique: true },
  options: [
    {
      Oid: {
        type: Number,
        required: true,
      },
    },
  ],
  queryText: { type: String, required: true },
});
const Feedback = new mongoose.model("Feedback", feedbackSchema);

module.exports = Feedback;
