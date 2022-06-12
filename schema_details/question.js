const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const questionSchema  = new Schema({
	/*questionId: {
		type: Schema.Types.ObjectId,
		ref: "Question"
	  },	*/
	  question: { type: String, required: true, unique:true },              
	  category: { type: String, required: true },
	  correctAnswer: { type: String, required: true},
	option1: {
		type: String, required: true
		
	  },
	  option2: {
		type: String, required: true
	  },
	  option3: {
		type: String, required: true
	  },
	  option4: {
		type: String, required: true
	  },
	  
})
const Question = new mongoose.model("Question",questionSchema );


module.exports = Question;