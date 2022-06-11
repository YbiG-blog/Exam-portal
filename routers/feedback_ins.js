const express = require("express");
const Feedback_Ins = require("../schema_details/instruction_feedback");
const router = new express.Router();
const atob=require("atob");
//const Language = Feedback_Ins.Language;
const Feedback = Feedback_Ins.Feedback;
const verify=require("../middleware/auth");
const User = require("../schema_details/user");


//instruction
router.patch("/instruction",verify,async (req, res) => {
    try {const token=req.cookies.jwt_csi;
        const dec=token.split(".")[1];
const decode=JSON.parse(atob(dec));
console.log(dec);
await User.findByIdAndUpdate(decode, {$set: {
    lang: req.body.lang
  }});
  

  res.status(200).send({"msg":"Language added successfully"});
     

    } catch (err) {
       // console.log(err);
        res.status(500).send(err);
    }
});
//feedback
router.post("/feedback", async (req, res) => {
    try {
        const { question1, question2, question3, question4, queryText } = await req.body;

        const feedbackData = new Feedback({
            question1, question2, question3, question4, queryText
        });

        const saveFeedback = await feedbackData.save();
        res.status(201).send("successfully done");

    } catch (err) {
        console.log(err);
        res.status(400).send(error);
    }
});

module.exports = router;