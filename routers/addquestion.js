const Question = require("../schema_details/question");
const express = require("express");

const router = new express.Router();

// get request
router.get("/addquestion", async (req, res) => {
  res.send("Add question");
});


const options = ['A', 'B', 'C', 'D'];
const correctans = 'B';
// post request
router.post("/addquestion", async (req, res) => {
  try {
    const { question, category } = await req.body;
    const question_create = new Question({
      question,
      category,
      //   options:options,
      correctAnswer: correctans
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
<<<<<<< HEAD
    console.log(err);
  }
=======
      console.log(err);}});
>>>>>>> 4166baa2cea95010fc1d0d8d753ef34680c368ce

module.exports = router;

