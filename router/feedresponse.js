const express = require("express");
const router = new express.Router();
const FeedAnswer = require("../models/feedresponse");
const FeedbackQuestion = require("../models/feedbackQuestion");
const User = require("../models/user");
const verify = require("../middleware/auth");
const jwtDecode = require("jwt-decode");

router.post("/feedanswer", verify, async (req, res) => {
  try {
    const isVerified = true;

    const { question, Qid, value, feedtext, cookie_token } = await req.body;
    const userId = jwtDecode(cookie_token);
    const { _id } = userId;
    let answer_create = new FeedAnswer({
      userId: _id,
      question,
      value,
      Qid,
      feedtext,
      // Quserid,
      // response,
      // feedtext,
    });
    await answer_create.save();
    await User.findByIdAndUpdate(_id, {
      $set: {
        hasAppeared: true,
      },
    });
    res.status(201).send({
      msg: "Response added for feedeback successfully",
      answer_create,
      isVerified,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = router;