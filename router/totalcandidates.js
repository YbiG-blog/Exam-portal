// total candidates registered
// total attendees
// total questions
// total feedback
// current active users

const express = require("express");
const router = new express.Router();
const User = require("../models/user");
const FeedbackQuestion = require("../models/feedbackQuestion");
const Question = require("../models/question");

router.get("/total", async (req, res) => {
  try {
    const total_registration = await User.find().countDocuments();
    const total_ques_uploaded = await Question.find().countDocuments();
    const total_feedback_ques = await FeedbackQuestion.find().countDocuments();
    const current_active_users = await User.find({
      hasAppeared: true,
    }).countDocuments();
    const total_attendees = await User.find({
    loginAt: {$ne: null},
    }).countDocuments();
    const result = {
      total_registration,
      total_ques_uploaded,
      total_feedback_ques,
      current_active_users,
      total_attendees,
    };
    res.status(200).json({ result });
    return;
  } catch (err) {
    res.sendStatus(500);
    return;
  }
});
module.exports = router;