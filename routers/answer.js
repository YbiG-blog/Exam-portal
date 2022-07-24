const express = require("express");
const router = new express.Router();
const Answer = require("../schema_details/answer");
const Question = require("../schema_details/question");
const User = require("../schema_details/user");
const atob = require("atob");
const verify = require("../middleware/auth");

router.put("/answer", verify, async (req, res) => {
  try {
    const token = req.body.cookie_token;

    const dec = token.split(".")[1];
    const decode = JSON.parse(atob(dec)); //contains Userid
    console.log(dec);

    const { question, category, userAnswer, ansid, Qid } =
      await req.body;
    let answer_create = new Answer({
      userId: decode,
      question,
      category,
      userAnswer,
      ansid,
      Qid,
    });
    await answer_create.save();

    await User.findOneAndUpdate(
      { _id: answer_create.userId },
      { $push: { results: answer_create._id } }
    );

    const quesFound = await Question.findById(Qid);
    if (quesFound) {
      for (let i = 0; i < 4; i++) {
        if (userAnswer == quesFound.options[i].value) {
          if (quesFound.options[i].isCorrect === true) {
            await Answer.findOneAndUpdate(
              { _id: answer_create._id },
              { $set: { isCorrect: true } }
            );
            const selopt = quesFound.options[i].value;
            await Question.findOneAndUpdate(
              { _id: Qid },
              {
                $set: {
                  selectedOpt: selopt
                },
              }
            );
            console.log("Correct answer");
          }
        }
      }
    }
    const Foundans = await Answer.findById(answer_create._id);
    if (Foundans) {  
      const flag = Foundans.ansid ;
      // console.log(flag);
      await Question.findOneAndUpdate(
        { _id: Qid },
        {
          $set: {
            flagMark: flag
          },
        }
      );
    }
    let msg = "Answer added successfully";
    if (ansid === 1) {
      msg = "Answer saved successfully";
    } else if (ansid === 3) {
      msg = "marked and review successfully added";
    } else if (ansid === 4) {
      msg = "marked and not answered successfully added";
    }
    await res.status(201).send({ msg, ansid });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put("/seeanswer/", async (req, res) => {
  try {
    const userId = req.body.userId;

    const AnswerData = await Answer.find({ userId: userId }).populate(
      "userId",
      "name studentNum branch score loginAt"
    );
    res.status(201).send(AnswerData);
  } catch (err) {
    res.status(400).send(err);
  }
});

// router.put("/flags", verify, async (req, res) => {
//   try {
//     const token = req.body.cookie_token;
//     const dec = token.split(".")[1];
//     const decode = JSON.parse(atob(dec)); //contains Userid
//     console.log(dec);
//     const ans_category = await Answer.find({ userId: decode });
//     // flags status
//     const result = [];
//     for (let i = 0; i < ans_category.length; i++) {
//       let markRev = ans_category[i].markRev;
//       let saveNext = ans_category[i].saveNext;
//       let ans_id = ans_category[i]._id;
//       let ques_id = ans_category[i].Qid;
//       const obj_flag = { ans_id, ques_id, saveNext, markRev };
//       result.push(obj_flag);
//     }
//     res.status(200).send(result);
//   } catch (err) {
//     console.log(err);
//     res.status(400).json(err);
//   }
// });

module.exports = router;
