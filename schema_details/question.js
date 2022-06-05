require('dotenv').config()
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const questionSchema = new Schema({
	question: { type: String, required: true },
	description: { type: String },
	optionType: { type: String, required: true },
    options: [{ key: Number, value: String }],
	correctAnswer: [{ type: String, required: true }],
    questionset_id :{ type: Number, required : true},
    question_id : { type: Number, required: true}
})

const Question = new mongoose.model("Question",questionSchema);

module.exports = Question;










