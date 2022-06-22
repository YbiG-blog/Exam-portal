const express = require("express");
const router = new express.Router();
const FeedAnswer = require("../schema_details/feedans");
const FeedQuestion = require("../schema_details/instruction_feedback");
const User = require("../schema_details/user");
const atob = require("atob");
const verify = require("../middleware/auth");

router.post("/feedanswer", verify, async (req, res) => {
  try {
    const token = req.body.cookie_token;
    const dec = token.split(".")[1];
    const decode = JSON.parse(atob(dec)); //contains Userid
    console.log(dec);

    const { question, Qid, value } = await req.body;
    let answer_create = new FeedAnswer({
      userId: decode,
      question,
      value,
      Qid,
    });
    await answer_create.save();

    res.status(201).send({
      msg: "Response added for feedeback successfully",
      answer_create,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = router;
