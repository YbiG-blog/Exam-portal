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
	option: {
		type: String,
	  }
})
const Answer = new mongoose.model("Answer",answerSchema );


module.exports = Answer;

