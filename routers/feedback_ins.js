const express = require("express");
const Feedback_Ins = require("../schema_details/instruction_feedback");
const router = new express.Router();
const Language = Feedback_Ins.Language;
const Feedback = Feedback_Ins.Feedback;


//instruction
router.post("/instruction", async (req, res) => {
    try {
        const {language} = await req.body;
        const insLanguage = new Language({
            language:language,
        });

        const saveLanguage = await insLanguage.save();
        res.status(201).send("successfully done");

    } catch (err) {
        console.log(err);
        res.status(400).send(error);
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