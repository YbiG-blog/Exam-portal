const express = require("express");
const router = new express.Router();
const Question = require("../models/question");
const Answer = require("../models/answer");
const User = require("../models/user");
const verify = require("../middleware/auth");
const jwtDecode = require("jwt-decode");


router.get("/seequestion", async (req, res) => {
  try {
    const QuestionsData = await Question.find();
    res.status(200).send({ result: QuestionsData });
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/addquestion", async (req, res) => {
  try {
    const { question, category, options } = await req.body;

    if (options.length === 4) {
      let question_create = new Question({
        question,
        category,
        options,
      });
      await question_create.save();
      res
        .status(201)
        .send({ msg: "Question added successfully", question_create });
    } else {
      res.status(400).send({ msg: "Please add all Four options" });
    }
  } catch (error) {
    res.status(400).json(error);
  }
});

//  getting the question based on id

router.get("/:qid", async (req, res) => {
  try {
    const question = await Question.findById(req.params.qid);
    for (let k = 0; k < 4; k++) {
      var j = Math.floor(Math.random() * (k + 1));
      var temp = question.options[k];
      // console.log(temp);
      question.options[k] = question.options[j];
      question.options[j] = temp;
    }
    res.status(200).json(question);
  } catch (err) {
    res.status(400).json(err);
    console.log(err);
  }
});

// getting the questions based on category

router.get("/category/:category", async (req, res) => {
  try {
    const ques_category = await Question.find({
      category: req.params.category,
    });
    res.status(200).json({ result: ques_category });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// delete a question

router.delete("/:id", async (req, res) => {
  try {
    await Question.findByIdAndDelete(req.params.id);
    res.status(200).json("Question deleted");
  } catch (err) {
    return res.status(400).json(err);
  }
});

// Update a question

router.patch("/:id", async (req, res) => {
  try {
    await Question.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    res.status(200).json("Question got updated");
  } catch (err) {
    return res.status(400).json(err);
  }
});
router.get("/shuffle/:category", async (req, res) => {
  try {
    const ques_category = await Question.find({
      category: req.params.category,
    });
    let ques_array = [];
    for (let i of ques_category) {
      ques_array.push(await Question.findById(i._id));
    }

    res.status(200).json({ result: ques_array });
  } catch (err) {
    console.log(err);
    res.status(400).json(`error ${err}`);
  }
});

// To-Do : return all the questions with user data and flags
router.put("/user-answers/:category", verify, async ({ body, params }, res) => {
  try {
    const userId = jwtDecode(body.cookie_token);
    const { _id } = userId;
    const { category } = params;
    const categoryQuestions = await Question.find({ category: category });
    const userFlags = await Answer.find(
      {
        $and: [{ userId: _id }, { category: category }],
      },
      { _id: 0, Qid: 1, userAnswer: 1, ansid: 1
      //  , selectedOpt: 1
       }
    );
    let updatedQuestions = [];
    categoryQuestions.forEach((question) => {
      const questionFound = userFlags.find((o) => o.Qid.equals(question._id));
      if (questionFound) {
        question = {
          ...question._doc,
          ansid: questionFound.ansid,
          userAnswer: questionFound.userAnswer,
        //  selectedOpt: questionFound.selectedOpt,
        };
      } else {
        question = {
          ...question._doc,
          ansid: 2,
          userAnswer: -1,
        //  selectedOpt: "",
        };
      }
      updatedQuestions.push(question);
    });
    res.status(200).send(updatedQuestions);
  } catch (err) {
    console.log(err);
    res.status(400).send("Bad Request");
  }
});
router.post("/questions/:category", verify, async (req, res) => {
  try {
    const categoryQuestions = await Question.find({ category: category });
    res
      .status(200)
      .json({ message: `All ${category} questions`, data: categoryQuestions });
  } catch (err) {}
});


module.exports = router;