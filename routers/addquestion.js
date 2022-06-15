const express = require("express");
const router = new express.Router();
const Answer = require("../schema_details/answer");
const Question = require("../schema_details/question");
const quesArray = require("../services/quesArray.json");

//add question array to db from json file
//one time code to directly add all the questions to db

router.get("/addquestion", async (req, res) => {
  try {
    for (let i = 0; i < quesArray.length; i++) {
      const quesArray_add = new Question({
        question: quesArray[i].question,
        quesid: 2022 * i,
        category: quesArray[i].category,
        option1: quesArray[i].option1,
        option2: quesArray[i].option2,
        option3: quesArray[i].option3,
        option4: quesArray[i].option4,
        correctAnswer: quesArray[i].correctAnswer,
      });
      quesArray_add.save();
    }

    res.status(200).send("Questions added successfully");
  } catch (err) {
    res.status(500).send(err);
  }
});

//accessible to admin only

router.get("/seequestion", async (req, res) => {
  try {
    const QuestionsData = await Question.find();
    res.status(201).send(QuestionsData);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/addquestion", async (req, res) => {
  try {
    const {
      question,
      category,
      correctAnswer,
      option1,
      option2,
      option3,
      option4,
    } = await req.body;
    const question_create = new Question({
      question,
      category,
      correctAnswer,
      option1,
      option2,
      option3,
      option4,
    });

    await question_create.save();
    res.status(201).send({ msg: "Question added successfully" });
  } catch (error) {
    res.status(400).json(error);
  }
});

// getting the questions based on category

router.get("/:category", async (req, res) => {
  try {
    const ques_category = await Question.find({
      category: req.params.category,
    });
    res.status(200).json(ques_category);
  } catch (err) {
    res.status(400).json(err);
  }
});

//  getting the question based on id

router.get("/:qid", async (req, res) => {
  try {
    const question = await Question.findbyId(req.params.qid);
    res.status(200).json(question);
  } catch (err) {
    res.status(400).json(err);
  }
});

// delete a question

router.delete("/:id", async (req, res) => {
  try {
    await Question.findByIdAndDelete(req.params.id);
    res.status(200).json("Question deleted");
  } catch (err) {
    return res.status(400).json(err);
  }
});

// Update a question

router.put("/:id", async (req, res) => {
  try {
    await Question.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    res.status(200).json("Question got updated");
  } catch (err) {
    return res.status(400).json(err);
  }
});
module.exports = router;
