const mongoose = require("mongoose");
const User = require("../schema_details/user");
const Schema = mongoose.Schema;

const questionSchema = new Schema({
  /*questionId: {
		type: Schema.Types.ObjectId,
		ref: "User"
	  },	*/
  question: { type: String, required: true, unique: true },
  quesid: { type: Number, unique: true },
  category: { type: String, required: true },
  correctAnswer: { type: String, required: true },
  options: [
    "option1",
    {
      type: String,
      required: true,
    },
    " option2",
    {
      type: String,
      required: true,
    },
    " option3",
    {
      type: String,
      required: true,
    },
    " option4",
    {
      type: String,
      required: true,
    },
  ],
});
const Question = new mongoose.model("Question", questionSchema);

module.exports = Question;
