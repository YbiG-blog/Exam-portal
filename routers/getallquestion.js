const express = require("express");
const router = new express.Router();

const Question = require("../schema_details/question");

router.get("/allquestions", async (req, res) => {
  const allquestions = await Question.find();
  const questionarray = allquestions.map((question) => question._id);
  try {
    res.status(200).send(questionarray);
  } catch (err) {
    res.status(500).send(err);
  }
});
module.exports = router;
