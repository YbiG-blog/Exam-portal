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

router.patch("/quesansdata", verify, async (req, res) => {
  try { const token = req.body.cookie_token;
    const dec = token.split(".")[1];
    const decode = JSON.parse(atob(dec)); //contains Userid
    console.log(dec);

    const findAns = await Answer.find({userId: decode});
   
    for (let i = 0; i < findAns.length; i++)
   { if (findAns[i].category === "HTML" || findAns[i].category === "html") {
            if (findAns[i].isCorrect=== true) {
              NumHtml += 1;
            }
          }
      else if (findAns[i].category === "CSS" || findAns[i].category === "css") {
            if (findAns[i].isCorrect=== true) {
              NumCss += 1;
            }
          }
     
     else if (findAns[i].category === "SQL" || findAns[i].category === "sql") {
            if (findAns[i].isCorrect=== true) {
              NumSql += 1;
            }
          }
    else if (findAns[i].category === "APTITUDE" || findAns[i].category === "aptitude") {
              if (findAns[i].isCorrect=== true) {
                NumAptitude += 1;
              }
            }
    else if (findAns[i].category === "C" || findAns[i].category === "C++" || findAns[i].category === "JAVA" || findAns[i].category === "PYTHON") {
              if (findAns[i].isCorrect=== true) {
                NumLang += 1;
                
              }
            }  
  }
  TotalNum = NumHtml + NumCss + NumAptitude + NumSql+ NumLang;
  await User.findOneAndUpdate(decode,
    {$set:{userNumCount: {NumHtml: NumHtml,NumCss: NumCss,NumSql: NumSql, NumAptitude: NumAptitude,NumLang: NumLang, TotalNum: TotalNum}}});
  
    res.status(200).send({"msg": "Total sum added"});
    NumHtml = 0,
    NumCss = 0,
    NumSql = 0,
    NumAptitude = 0,
    NumLang=0,
    TotalNum = 0;} 
    
    catch (err) {
    res.status(400).send(err);
  }
  
});

router.get("/leaderboard",async (req,res)=>{try{

const lead=await User.find({},{name:1, studentNum:1, branch:1, userNumCount:1, lang:1}).sort({"userNumCount.TotalNum":-1});
res.status(200).send(lead);

}

catch (error) {
  res.status(500).send(error);
}

});

module.exports = router;