const Question = require("../models/question");
const Answer = require("../models/answer");
const User = require("../models/user");
const express = require("express");
const verify = require("../middleware/auth");
const jwtDecode = require("jwt-decode");
const router = new express.Router();

router.get("/leaderboard", async (req, res) => {
  try {
    const leader = await User.find().sort({ userNumCount: -1 });
    res.status(200).send(leader);
  } catch (error) {
    res.status(500).send(error);
  }
});

// get candidate details

router.get("/candidate", async (req, res) => {
  try {
    const details = await User.find(
      {},
      {
        name: 1,
        email: 1,
        studentNum: 1,
        rollNum: 1,
        mobileNum: 1,
        branch: 1,
        year: 1,
        gender: 1,
        isHosteler: 1,
        lang: 1,
        loginAt: 1,
        "userNumCount.TotalNum": 1,
      }
    );
    res.status(200).send(details);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/score", verify, async (req, res) => {
  try {
    const cookie_token = req.body.cookie_token;
    const userId = jwtDecode(cookie_token);
    const { _id } = userId;

    const finduserAns = await Answer.find({ userId: _id });
    let Num = 0;
    for (let i = 0; i < finduserAns.length; i++) {
      const AnsByQid = await Question.findById(finduserAns[i].Qid);
      for (let j = 0; j < 4; j++) {
        if (
          finduserAns[i].userAnswer == AnsByQid.options[j].Oid &&
          AnsByQid.options[j].isCorrect === true
        ) {
          Num++;
        }
      }
    }

    User.findOneAndUpdate(
      { _id: _id },
      {
        $set: {
          userNumCount: Num,
          logoutAt: new Date()
            .toISOString()
            .replace(/T/, " ")
            .replace(/\..+/, ""),
        },
      },
      (err, docs) => {
        if (err) console.log(err);
        else console.log(docs);
      }
    );

    console.log(Num);
    res.status(200).send({
      message: "User score saved successfully",
    });
  } catch (err) {
    res.status(400).send(`err ${err}`);
  }
});

module.exports = router;