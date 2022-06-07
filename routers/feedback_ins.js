const express = require("express");
const Feedback_Ins = require("../schema_details/instruction_feedback");
const router = new express.Router();
//const Language = Feedback_Ins.Language;
const Feedback = Feedback_Ins.Feedback;
const verify=require("../middleware/auth");
const User = require("../schema_details/user");


//instruction
router.put("/instruction", verify,async (req, res) => {
    try {const id=(req.headers['id']);
console.log(id);
    await User.findByIdAndUpdate(id, {
            lang: req.body.lang,
          },(err)=>{
            console.log(err);
          });

          res.status(200).send({"msg":"Language added successfully"});
     

    } catch (err) {
        console.log(err);
        res.status(400).send(err);
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