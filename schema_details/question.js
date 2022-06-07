require('dotenv').config()
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const questionSchema = new Schema({
	userId: {
		type: Schema.Types.ObjectId,
		ref: "User"
	  },
	question: { type: String, required: true },
	category: { type: String, required: true },
    // options: [{ key: Number, value: String }],
	correctAnswer: { type: String},
	iscorrect: { type: Boolean, default: false },
    // questionset_id :{ type: Number, required : true},
    // question_id : { type: Number, required: true} 
})

const Question = new mongoose.model("Question",questionSchema);

module.exports = Question;










