const express = require("express");
const router = new express.Router();
const Question = require("../schema_details/question");
const Answer = require("../schema_details/answer");
const quesArray = require("../services/quesArray.json");
const User = require("../schema_details/user");
const verify = require("../middleware/auth");
const atob = require("atob");

//add question array to db from json file
//one time code to directly add all the questions to db

router.get("/addquestion", async (req, res) => {
  try {
    // for (let i = 0; i < quesArray.length; i++) {
    //   const quesArray_add = new Question({
    //     question: quesArray[i].question,
    //     quesid: 2022 * i,
    //     category: quesArray[i].category,
    //     option1: quesArray[i].option1,
    //     option2: quesArray[i].option2,
    //     option3: quesArray[i].option3,
    //     option4: quesArray[i].option4,
    //     correctAnswer: quesArray[i].correctAnswer,
    //   });
    //   quesArray_add.save();
    // }

    res.status(200).send("Api working!");
  } catch (err) {
    res.status(500).send(err);
  }
});

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
      // for (let i of req.body.options) {
      //   const question_create = new Question({
      //     question,
      //     category,
      //     options
      //   });
      //     { "question":"what is?",
      // "category":"python",
      // "options":[{"value":"poiu",
      // "Oid":"45659",
      // "isCorrect":false},
      // {"value":"qwert",
      // "Oid":"789",
      // "isCorrect":true}
      // ]}

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
// category flags
// router.put("/flags/:category", verify, async (req,res)=>{
//   try {
//     const isVerified = true;
//     const token = req.body.cookie_token;
//     const dec = token.split(".")[1];
//     const decode = JSON.parse(atob(dec)); //contains Userid
//     console.log(dec);
//     const shuffleques = await User.findById(decode._id);
//     const type = req.params.category;
//     let qry_array = [];

//     if (type == "HTML" || type == "html") {
//       qry_array = shuffleques.Ahtml.val;
//     } else if (type == "CSS" || type == "css") {
//       qry_array = shuffleques.Acss.val;
//     } else if (type == "SQL" || type == "sql") {
//       qry_array = shuffleques.Asql.val;
//     } else if (type == "APTITUDE" || type == "aptitude") {
//       qry_array = shuffleques.Aaptitude.val;
//     } else if (
//       type == "C" ||
//       type == "C++" ||
//       type == "JAVA" ||
//       type == "PYTHON"
//     ) {
//       qry_array = shuffleques.Aother.val;
//     }
//     let finalArray = [];
//     for (let i = 0; i < qry_array.length; i++) {
//       let ansmatch = await Answer.find({ Qid: qry_array[i]._id, userId: shuffleques._id });
//       console.log(ansmatch[ansmatch.length-1]);
//       let ans_flagRes = {}
//       if (ansmatch.length != 0) {
//         let ans_flag = {
//           // userid: ansmatch[ansmatch.length-1].userId,
//           flag: ansmatch[ansmatch.length - 1].ansid,
//           setopt: ansmatch[ansmatch.length - 1].selectedOpt
//         }
//         ans_flagRes = ans_flag
//       } else {
//         let ans_flag = {
//           flag: 2,
//           setopt: ""
//         }
//         ans_flagRes = ans_flag
//       }
//       finalArray.push(ans_flagRes);
//     }
//       res.status(200).json({ result: finalArray });
//   } catch (err) {

//     res.status(400).json(err);
//   }
   
// })
// shuffle category
// router.put("/shuffle/:category", verify, async (req, res) => {
//   try {
//     const isVerified = true;
//     const token = req.body.cookie_token;
//     const dec = token.split(".")[1];
//     const decode = JSON.parse(atob(dec)); //contains Userid
//     console.log(dec);
//     const userFind = await User.findById(decode._id);
//     const type = req.params.category;
//     const ques_category = await Question.find({
//       category: type,
//     });
//     let ques_array = [];
//     for (let i of ques_category) {
//       ques_array.push(await Question.findById(i._id));
//     }

//     for (var i = ques_array.length - 1; i > 0; i--) {
//       var j = Math.floor(Math.random() * (i + 1));
//       var temp = ques_array[i];
//       ques_array[i] = ques_array[j];
//       ques_array[j] = temp;
//     }
//     //     // condition for shuffling
//     if ((type == "HTML" || type == "html") && userFind.Ahtml.f == false) {
//       await User.findByIdAndUpdate(decode._id, {
//         $set: {
//           Ahtml: { f: true, val: ques_array },
//         },
//       });
//     } else if ((type == "CSS" || type == "css") && userFind.Acss.f == false) {
//       await User.findByIdAndUpdate(decode._id, {
//         $set: {
//           Acss: { f: true, val: ques_array },
//         },
//       });
//     } else if ((type == "SQL" || type == "sql") && userFind.Asql.f == false) {
//       await User.findByIdAndUpdate(decode._id, {
//         $set: {
//           Asql: { f: true, val: ques_array },
//         },
//       });
//     } else if (
//       (type == "APTITUDE" || type == "aptitude") &&
//       userFind.Aaptitude.f == false
//     ) {
//       await User.findByIdAndUpdate(decode._id, {
//         $set: {
//           Aaptitude: { f: true, val: ques_array },
//         },
//       });
//     } else if (
//       (type == "C" || type == "C++" || type == "JAVA" || type == "PYTHON") &&
//       userFind.Aother.f == false
//     ) {
//       await User.findByIdAndUpdate(decode._id, {
//         $set: {
//           Aother: { f: true, val: ques_array },
//         },
//       });
//     }
//     // shuffle questions
//     const shuffleques = await User.findById(userFind._id);
//     let qry_array = [];
//     if (type == "HTML" || type == "html") {
//       qry_array = shuffleques.Ahtml.val;
//     } else if (type == "CSS" || type == "css") {
//       qry_array = shuffleques.Acss.val;
//     } else if (type == "SQL" || type == "sql") {
//       qry_array = shuffleques.Asql.val;
//     } else if (type == "APTITUDE" || type == "aptitude") {
//       qry_array = shuffleques.Aaptitude.val;
//     } else if (
//       type == "C" ||
//       type == "C++" ||
//       type == "JAVA" ||
//       type == "PYTHON"
//     ) {
//       qry_array = shuffleques.Aother.val;
//     } 
//     res.status(200).json({ result: qry_array });

 
// //     let finalArray = [];
// //     for (let i = 0; i < qry_array.length; i++) {
// //       let quesget = qry_array[i];
// //       let ansmatch = await Answer.find({
// //         Qid: qry_array[i]._id,
// //         userId: shuffleques._id,
// //       });
// //       console.log(ansmatch[ansmatch.length - 1]);
// //       let ans_flagRes = {};
// //       if (ansmatch.length != 0) {
// //         let ans_flag = {
// //           // userid: ansmatch[ansmatch.length-1].userId,
// //           flag: ansmatch[ansmatch.length - 1].ansid,
// //           setopt: ansmatch[ansmatch.length - 1].selectedOpt,
// //         };
// //         ans_flagRes = ans_flag;
// //       } else {
// //         let ans_flag = {
// //           flag: 2,
// //           setopt: "",
// //         };
// //         ans_flagRes = ans_flag;
// //       }
// //       finalArray.push({ quesget, ans_flagRes });
// //     }
//   //  res.status(200).json({ result: finalArray });
//   } catch (err) {
//     console.log(err);
//     res.status(400).json(err);
//   }
// });
router.put("/shuffle/:category", verify, async (req, res) => {
  try {
    const isVerified = true;
    const token = req.body.cookie_token;
    const dec = token.split(".")[1];
    const decode = JSON.parse(atob(dec)); //contains Userid
    console.log(dec);

    const type = req.params.category;
    const ques_category = await Question.find({
      category: type,
    });
    let ques_array = [];
    for (let i of ques_category) {
      let quesget = await Question.findById(i._id);
      let ansmatch = await Answer.find({ Qid: i._id, userId : decode._id});
      let ans_flagRes = {}
      if(ansmatch.length!=0){
      let ans_flag = {
        // userid: ansmatch[ansmatch.length-1].userId,
        flag : ansmatch[ansmatch.length-1].ansid,
        setopt : ansmatch[ansmatch.length-1].selectedOpt
      }
      ans_flagRes = ans_flag
    }else
    {
      let ans_flag = {
        flag : 2,
        setopt : ""
      }
      ans_flagRes = ans_flag
    }
      ques_array.push({quesget ,ans_flagRes});
    }
    res.status(200).json({ result: ques_array });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

module.exports = router;
