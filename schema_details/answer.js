const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const answerSchema = new Schema({
	userId: {
		type: Schema.Types.ObjectId,                      
		ref: "User"
	  },        
    questionId: {
		type: Schema.Types.ObjectId,
		ref: "Question"
	  },                                          
	question: { type: String, required: true },              
	category: { type: String, required: true },
	userAnswer: { type: String},
	isCorrect:{type: Boolean},
	mark_for_review :{type: Boolean, default:false},
	save_and_next :{type: Boolean, default:false}
})



const Answer = new mongoose.model("Answer", answerSchema);


module.exports = Answer;
