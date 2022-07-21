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

    const { question, category, userAnswer, markRev, saveNext, ansid, Qid } =
      await req.body;
    let answer_create = new Answer({
      userId: decode,
      question,
      category,
      userAnswer,
      markRev,
      saveNext,
      mark,
      ansid,
      Qid,
    });
    await answer_create.save();

    const quesFound = await Question.findById(Qid);
    if (quesFound) {
      for (let i = 0; i < 4; i++) {
        if (userAnswer == quesFound.options[i].Oid) {
          if (quesFound.options[i].isCorrect === true) {
            await Answer.findOneAndUpdate(
              { _id: answer_create._id },
              { $set: { isCorrect: true } }
            );
            console.log("Correct answer");
          }
        }
      }
    }
    const Foundans = await Answer.findById(Qid);
    if(Foundans)
    {
      let f1 = false,f2=false;
      if(Foundans.ansid===1) {f1=true};
      if (Foundans.ansid===3) {f2=true};
      await Answer.findOneAndUpdate(
       { _id: answer_create._id },
       { $set: { 
         markRev: f2,
         saveNext: f1, 
       } }
     );
    }

    await res.status(201).send({ msg: "Answer added successfully", ansid});
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/seeanswer/", async (req, res) => {
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
// router.patch("/updateflags/:id", async (req, res) => {
//   try {
//     const findAns = await Answer.findById(req.params.id);;
//     let f = false;
//    if(findAns.ansid===1) {f=true};
//    if (findAns.ansid===3) {f=true};

//     const findAnsUpdate = await Answer.findByIdAndUpdate(req.params.id,{
//       $set: {
//         markRev: f,
//         saveNext: f,
//       }
//     });

//     res.status(201).send(findAnsUpdate);
   
//     res.status(201).send();
//   } catch (err) {
//     res.status(400).send(err);
//   }
// });

router.get("/:category", async (req, res) => {
  try {
    const ans_category = await Answer.find({
      category: req.params.category,
    });
 const markR = ans_category.markRev;
 const saveN = ans_category.saveNext;
 const result = {
  markR,
  saveN
 }
    res.status(200).json({ result });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});
module.exports = router;
