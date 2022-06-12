const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const answerSchema = new Schema({
	/*questionId: {
		type: Schema.Types.ObjectId,
		ref: "Question"
	  },	*/
	  question: { type: String, required: true, unique:true },              
	  category: { type: String, required: true },
	  correctAnswer: { type: String},
	option1: {
		type: String
	  },
	  option2: {
		type: String
	  },
	  option3: {
		type: String
	  },
	  option4: {
		type: String
	  },
	  
})
const Answer = new mongoose.model("Answer",answerSchema );


module.exports = Answer;

