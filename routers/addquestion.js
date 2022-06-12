const express = require("express");
const router = new express.Router();
const Question = require("../schema_details/question");
const Answer = require("../schema_details/answer");
const quesArray=require("../services/quesArray.json");


//add question array to db
router.get("/addquestion", async(req, res) => {try{
console.log("hi");
/*for(let i=0;i< quesArray.length; i++){
const quesArray_add=new Answer({
  question: quesArray[i].question,
  category: quesArray[i].category,
  option1: quesArray[i].option1,
  option2: quesArray[i].option2,
  option3: quesArray[i].option3,
  option4: quesArray[i].option4,
  correctAnswer: quesArray[i].correctAnswer
});
console.log(quesArray_add);
await quesArray_add.save();*/
res.send("Added questions");}
catch(err){console.log(err);}});


// get request

const options = ["A", "B", "C", "D"];
const correctans = "B";
// post request
router.post("/addquestion", async (req, res) => {
  try {
    const { question, category } = await req.body;
    const question_create = new Question({
      question,
      category,
      userAnswer: correctans,
    });

    for (let i = 0; i < options.length; i++) {
      const element = options[i];
      if (element == correctans) {
        question_create.iscorrect = true;
        break;
      }
    }
    const savequestion = await question_create.save();
    res.status(201).send(savequestion);
  } catch (err) {
    console.log(err);
  }
  console.log(err);
});

module.exports = router;
