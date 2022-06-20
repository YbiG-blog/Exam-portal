const express = require("express");
const router = new express.Router();
const Answer = require("../schema_details/answer");
const User = require("../schema_details/user");
const atob = require("atob");
const verify = require("../middleware/auth");

router.post("/answer", verify, async (req, res) => {
  try {
    const token = req.body.cookie_token;

    const dec = token.split(".")[1];
    const decode = JSON.parse(atob(dec)); //contains userId
    console.log(dec);

    const { question, category, userAnswer, markRev, saveNext, Qid } =
      await req.body;
    let answer_create = new Answer({
      userId: decode,
      question,
      category,
      userAnswer,
      markRev,
      saveNext,
      Qid,
    });
    await answer_create.save();

    res.status(201).send({ msg: "Response added successfully", answer_create });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/seeanswer", async (req, res) => {
  try {
    const AnswerData = await Answer.find({ userId: decode }).populate(
      "userId",
      "name studentNum branch score loginAt"
    );
    res.status(201).send(AnswerData);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

module.exports = router;
