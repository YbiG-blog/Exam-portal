const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const questionSchema = new Schema({
	userId: {
		type: Schema.Types.ObjectId,
		ref: "User"
	  },
	question: { type: String, required: true },
	category: { type: String, required: true },
	correctAnswer: { type: String},
	visited_ques :{type: Boolean, default:false},
	not_visited_ques :{type: Boolean, default:false},
	mark_for_review :{type: Boolean, default:false},
	save_and_next :{type: Boolean, default:false}
})



const Question = new mongoose.model("Question", questionSchema);


module.exports = Question;
