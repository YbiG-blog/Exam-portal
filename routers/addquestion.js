const Question = require("../schema_details/question");
const express = require("express");

const router = new express.Router();

// get request
router.get("/addquestion", async (req, res) => {
  res.send("Add question");
});

// post request
router.post("/addquestion", async (req, res) => {
  try {
    const { question, category } = await req.body;
    const question_create = new Question({
      question,
      category,
    });

    const savequestion = await question_create.save();
    res.status(201).send(savequestion);
  } catch (err) {
    res.status(400).send(err);
  }

  // option fields : option and iscorrect
});

module.exports = router;
