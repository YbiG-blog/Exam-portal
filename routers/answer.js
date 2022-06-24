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
    // working on matching the correct answer
    //    const quesFound=await Question.findById(Qid);
    //     if(quesFound)
    //     {

    // for(let i=0; i<quesFound.options.length;i++)
    //      { if(userAnswer===quesFound.options[i].value)
    //       {console.log(userAnswer);
    //         console.log(quesFound.options[i].value);
    //         if(quesFound.options[i].isCorrect===true)
    //         {
    //          await Answer.findByIdAndUpdate(Qid,
    //             {$set:{isCorrect: true}});
    //             res.status(201).json(Answer.findById(Qid));

    //         }

    //       }}
    //}

    res.status(201).send({ msg: "Response added successfully", answer_create });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/seeanswer", async (req, res) => {
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

module.exports = router;
