const Question = require("../schema_details/question");
const Answer = require("../schema_details/answer");
const User = require("../schema_details/user");
const express = require("express");
const verify = require("../middleware/auth");
const atob = require("atob");

///  left for connecting user with ques........
const router = new express.Router();
let NumHtml = 0,
  NumCss = 0,
  NumSql = 0,
  NumAptitude = 0,
  NumLang=0,
  TotalNum = 0;

router.get("/quesansdata", verify, async (req, res) => {
  try { const token = req.body.cookie_token;
    const dec = token.split(".")[1];
    const decode = JSON.parse(atob(dec)); //contains Userid
    console.log(dec);

    const findAns = await Answer.find({userId: decode});
    res.send(findAns);
    for (let i = 0; i < findAns.length; i++)
   { if (findAns[i].category === "HTML" || findAns[i].category === "html") {
            if (findAns[i].isCorrect=== true) {
              NumHtml += 1;
              await User.findOneAndUpdate(decode,
                {$set:{userNumCount: {NumHtml: NumHtml}}});
            }
          }
      else if (findAns[i].category === "CSS" || findAns[i].category === "css") {
            if (findAns[i].isCorrect=== true) {
              NumCss += 1;
              await User.findOneAndUpdate(decode,
                {$set:{userNumCount: {NumCss: NumCss}}});
            }
          }
     
     else if (findAns[i].category === "SQL" || findAns[i].category === "sql") {
            if (findAns[i].isCorrect=== true) {
              NumSql += 1;
              await User.findOneAndUpdate(decode,
                {$set:{userNumCount: {NumSql: NumSql}}});
            }
          }
    else if (findAns[i].category === "APTITUDE" || findAns[i].category === "aptitude") {
              if (findAns[i].isCorrect=== true) {
                NumAptitude += 1;
                await User.findOneAndUpdate(decode,
                  {$set:{userNumCount: {NumAptitude: NumAptitude}}});
              }
            }
    else if (findAns[i].category === "C" || findAns[i].category === "C++" || findAns[i].category === "JAVA" || findAns[i].category === "PYTHON") {
              if (findAns[i].isCorrect=== true) {
                NumLang += 1;
                await User.findOneAndUpdate(decode,
                  {$set:{userNumCount: {NumLang: NumLang}}});
              }
            }  
  }
  TotalNum = NumHtml + NumCss + NumAptitude + NumSql+ NumLang;
  await User.findOneAndUpdate(decode,
    {$set:{userNumCount: {TotalNum: TotalNum}}});
    console.log("Total sum added");} catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;