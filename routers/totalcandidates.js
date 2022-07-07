// total candidates registered
// total attendees
// total questions
// total feedback
// current active users

const express = require("express");
const router = new express.Router();
const User = require("../schema_details/user");
const Feedback_Ins = require("../schema_details/ins_feed");
const Question = require("../schema_details/question");

router.get("/total", async(req,res)=>{
    try {
        const total_registration = await User.find().countDocuments();
        const  total_ques_uploaded = await Question.find().countDocuments();
        const total_feedback_ques = await Feedback_Ins.find().countDocuments();
        const current_active_users = await User.find({ hasAppeared: true }).countDocuments();
        const total_attendees = await User.find({ login_user : true }).countDocuments();
        const result = {total_registration, total_ques_uploaded,total_feedback_ques, current_active_users, total_attendees};
        console.log(result);
        res.status(200).json({ result });
        return;
      } catch (err) {
        res.sendStatus(500);
       return;
      }
})
module.exports = router;
