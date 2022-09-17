const express = require("express");
const router = new express.Router();
const FeedAnswer = require("../schema_details/feedresponse");
const FeedQuestion = require("../schema_details/ins_feed");
const User = require("../schema_details/user");
const atob = require("atob");
const verify = require("../middleware/auth");

router.post("/feedanswer", verify, async (req, res) => {
  try {
    const isVerified = true;
    const token = req.body.cookie_token;
    const dec = token.split(".")[1];
    const decode = JSON.parse(atob(dec)); //contains Userid
    console.log(dec);

    const { question, Qid, value, feedtext } = await req.body;
    // const { Quserid, response, feedtext } = await req.body;
    let answer_create = new FeedAnswer({
      userId: decode,
      question,
      value,
      Qid,
      feedtext,
      // Quserid,
      // response,
      // feedtext,
    });
    await answer_create.save();
    await User.findByIdAndUpdate(decode, {
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
