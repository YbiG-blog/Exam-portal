const express = require("express");
const Feedback_Ins = require("../schema_details/instruction_feedback");
const router = new express.Router();
const atob = require("atob");
const verify = require("../middleware/auth");
const User = require("../schema_details/user");

//instruction

router.patch("/instruction", verify, async (req, res) => {
  try {
    const token = req.body.cookie_token;

    const dec = token.split(".")[1];
    const decode = JSON.parse(atob(dec));
    console.log(dec);
    await User.findByIdAndUpdate(decode, {
      $set: {
        loginAt: new Date().toISOString().replace(/T/, " ").replace(/\..+/, ""),
        hasAppeared: true,
        lang: req.body.lang,
      },
    });

    res.status(200).send({ msg: "Language added successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).send("err");
  }
});

//feedback

router.post("/addfeedback", async (req, res) => {
  try {
    const { question, queryText, options } = await req.body;
    let feedbackques_create = new Feedback_Ins({
      question,
      queryText,
      options,
    });
    await feedbackques_create.save();
    res.status(201).send({
      msg: " Feedback Question added successfully",
      feedbackques_create,
    });
  } catch (error) {
    res.status(400).json(error);
  }
});


router.get("/feed/seefeedbackques", async (req, res) => {
  try {
    const feedbackQuestionsData = await Feedback_Ins.find();
    res.status(201).send(feedbackQuestionsData);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
