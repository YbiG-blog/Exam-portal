const Question = require("../schema_details/question");
const Answer = require("../schema_details/answer");
const User = require("../schema_details/user");
const express = require("express");
///  left for connecting user with ques........
const router = new express.Router();
let NumHtml = 0,
  NumCss = 0,
  NumSql = 0,
  NumAptitude = 0,
  totalNum = 0;

router.get("/quesansdata", async (req, res) => {
  try {
    const findQues = await Question.find();
    if (findQues.category === "HTML") {
      for (let i = 0; i < findQues.length; i++) {
        if (findQues.quesid === 2022 * i) {
          for (let j = 1; j <= 4; j++) {
            if (findQues.correctAnswer === findQues.option * j) {
              NumCss += 1;
            }
          }
        }
      }
    } else if (findQues.category === "CSS") {
      for (let i = 0; i < findQues.length; i++) {
        if (findQues.quesid === 2022 * i) {
          for (let j = 1; j <= 4; j++) {
            if (findQues.correctAnswer === findQues.option * j) {
              NumSql += 1;
            }
          }
        }
      }
    } else if (findQues.category === "SQL") {
      for (let i = 0; i < findQues.length; i++) {
        if (findQues.quesid === 2022 * i) {
          for (let j = 1; j <= 4; j++) {
            if (findQues.correctAnswer === findQues.option * j) {
              NumAptitude += 1;
            }
          }
        }
      }
    } else if (findQues.category === "APTITUDE") {
      for (let i = 0; i < findQues.length; i++) {
        if (findQues.quesid === 2022 * i) {
          for (let j = 1; j <= 4; j++) {
            if (findQues.correctAnswer === findQues.option * j) {
              NumAptitude += 1;
            }
          }
        }
      }
    }
    totalNum = NumHtml + NumCss + NumAptitude + NumSql;
  } catch (err) {
    res.status(400).send(err);
  }
});
