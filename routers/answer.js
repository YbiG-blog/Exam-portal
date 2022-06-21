const express = require("express");
const router = new express.Router();
const Answer = require("../schema_details/answer");
const Question = require("../schema_details/question");
const User = require("../schema_details/user");
const atob = require("atob");
const verify = require("../middleware/auth");

router.post("/answer", verify, async (req, res) => {
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
    //working on matching the correct answer
//    const quesFound=Question.findById(Qid);
//    //currently working on it
//     if(quesFound)
//     {console.log("quesFound");
//     console.log(quesFound.options);
// for(const i=0; i<quesFound.options.length;i++)
//      { if(userAnswer==quesFound.options[i].value)
//       {
//         if(isCorrect)
//         {
//           Answer.findByIdAndUpdate(Qid,
//             {$set:{isCorrect: true}});
//         }

//       }}
//     }

    res.status(201).send({ msg: "Response added successfully", answer_create });
  } catch (error) {
    res.status(500).json(error);
  }
});


router.get("/seeanswer",async (req,res)=>{
    try {const userId = req.body.userId;

        const AnswerData = await Answer.find({userId:userId}).populate('userId','name studentNum branch score loginAt');
        res.status(201).send(AnswerData);
      } catch (err) {
        res.status(400).send(err);
      }

});

module.exports = router;
