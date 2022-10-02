const express = require("express");
const router = new express.Router();
const Answer = require("../models/answer");
const Question = require("../models/question");
const User = require("../models/user");
const jwtDecode = require("jwt-decode");
const verify = require("../middleware/auth");

const mongoose = require("mongoose");

router.put("/set-answer", verify, async ({ body }, res) => {
  try {
    const { question, userAnswer, ansid, Qid, cookie_token, category } = body;
    const userId = jwtDecode(cookie_token);
    const { _id } = userId;
    const answer = await Answer.findOneAndUpdate(
      {
        $and: [{ userId: _id }, { Qid: Qid }],
      },
      { $set: { ansid: ansid, userAnswer: userAnswer } }
    );
    if (!answer) {
      new Answer({
        question: question,
        category: category,
        userId: userId,
        Qid: new mongoose.Types.ObjectId(Qid),
        userAnswer: userAnswer,
        ansid: ansid,
      }).save();
    }
    res.status(200).send("Answer added/updated successfully");
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

router.put("/submit/answer", verify, async ({ body }, res) => {
  try {
    const userId = jwtDecode(body.cookie_token);
    const { _id } = userId;
    res.status(200).send(_id);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put("/seeanswer", async (req, res) => {
  try {
    const userId = req.body.userId;

    const AnswerData = await Answer.find({ userId: userId }).populate(
      "userId",
      "name studentNum branch score loginAt"
    );
    res.status(201).send(AnswerData);
  } catch (err) {
    res.status(400).send(err);
    console.log(err);
  }
});

module.exports = router;