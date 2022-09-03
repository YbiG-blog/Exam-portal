const express = require("express");
const router = new express.Router();
const Question = require("../schema_details/question");
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
// showing some error
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
// showing some error
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

// shuffle category
router.put("/shuffle/:category", verify, async (req, res) => {
  try {
    const isVerified = true;
    const token = req.body.cookie_token;
    const dec = token.split(".")[1];
    const decode = JSON.parse(atob(dec)); //contains Userid
    console.log(dec);

    const userFind = await User.findById(decode._id);
    const type = req.params.category;
    const ques_category = await Question.find({
      category: type,
    });
    let ques_array = [];
    for (let i of ques_category) {
      ques_array.push(await Question.findById(i._id));
    }
    for (var i = ques_array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = ques_array[i];
      ques_array[i] = ques_array[j];
      ques_array[j] = temp;
    }
    // condition for shuffling

    if (
      (type == "HTML" || type == "html") &&
      userFind.shuffle.Ahtml.f == false
    ) {
      await User.findByIdAndUpdate(decode._id, {
        $set: {
          shuffle: {
            Ahtml: { f: true, val: ques_array },
            Acss: {
              f: userFind.shuffle.Acss.f,
              val: userFind.shuffle.Acss.val,
            },
            Asql: {
              f: userFind.shuffle.Asql.f,
              val: userFind.shuffle.Asql.val,
            },
            Aaptitude: {
              f: userFind.shuffle.Aaptitude.f,
              val: userFind.shuffle.Aaptitude.val,
            },
            Aother: {
              f: userFind.shuffle.Aother.f,
              val: userFind.shuffle.Aother.val,
            },
          },
        },
      });
    } else if (
      (type == "CSS" || type == "css") &&
      userFind.shuffle.Acss.f == false
    ) {
      await User.findByIdAndUpdate(decode._id, {
        $set: {
          shuffle: {
            Ahtml: {
              f: userFind.shuffle.Ahtml.f,
              val: userFind.shuffle.Ahtml.val,
            },
            Acss: { f: true, val: ques_array },
            Asql: {
              f: userFind.shuffle.Asql.f,
              val: userFind.shuffle.Asql.val,
            },
            Aaptitude: {
              f: userFind.shuffle.Aaptitude.f,
              val: userFind.shuffle.Aaptitude.val,
            },
            Aother: {
              f: userFind.shuffle.Aother.f,
              val: userFind.shuffle.Aother.val,
            },
          },
        },
      });
    } else if (
      (type == "SQL" || type == "sql") &&
      userFind.shuffle.Asql.f == false
    ) {
      await User.findByIdAndUpdate(decode._id, {
        $set: {
          shuffle: {
            Ahtml: {
              f: userFind.shuffle.Ahtml.f,
              val: userFind.shuffle.Ahtml.val,
            },
            Acss: {
              f: userFind.shuffle.Acss.f,
              val: userFind.shuffle.Acss.val,
            },
            Asql: { f: true, val: ques_array },
            Aaptitude: {
              f: userFind.shuffle.Aaptitude.f,
              val: userFind.shuffle.Aaptitude.val,
            },
            Aother: {
              f: userFind.shuffle.Aother.f,
              val: userFind.shuffle.Aother.val,
            },
          },
        },
      });
    } else if (
      (type == "APTITUDE" || type == "aptitude") &&
      userFind.shuffle.Aaptitude.f == false
    ) {
      await User.findByIdAndUpdate(decode._id, {
        $set: {
          shuffle: {
            Ahtml: {
              f: userFind.shuffle.Ahtml.f,
              val: userFind.shuffle.Ahtml.val,
            },
            Acss: {
              f: userFind.shuffle.Acss.f,
              val: userFind.shuffle.Acss.val,
            },
            Asql: {
              f: userFind.shuffle.Asql.f,
              val: userFind.shuffle.Asql.val,
            },
            Aaptitude: { f: true, val: ques_array },
            Aother: {
              f: userFind.shuffle.Aother.f,
              val: userFind.shuffle.Aother.val,
            },
          },
        },
      });
    } else if (
      (type == "C" || type == "C++" || type == "JAVA" || type == "PYTHON") &&
      userFind.shuffle.Aother.f == false
    ) {
      await User.findByIdAndUpdate(decode._id, {
        $set: {
          shuffle: {
            Ahtml: {
              f: userFind.shuffle.Ahtml.f,
              val: userFind.shuffle.Ahtml.val,
            },
            Acss: {
              f: userFind.shuffle.Acss.f,
              val: userFind.shuffle.Acss.val,
            },
            Asql: {
              f: userFind.shuffle.Asql.f,
              val: userFind.shuffle.Asql.val,
            },
            Aaptitude: {
              f: userFind.shuffle.Aaptitude.f,
              val: userFind.shuffle.Aaptitude.val,
            },
            Aother: { f: true, val: ques_array },
          },
        },
      });
    }
    const shuffleques = await User.findById(userFind._id);
    const ar = shuffleques.shuffle;
    res.status(200).send(ar);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// router.get("/shuffle/:category", async (req, res) => {
//   try {
//     const ques_category = await Question.find({
//       category: req.params.category,
//     });
//     let ques_array = [];
//     for (let i of ques_category) {
//       ques_array.push(await Question.findById(i._id))
//     }

//     for (var i = ques_array.length - 1; i > 0; i--) {
//       var j = Math.floor(Math.random() * (i + 1));
//       var temp = ques_array[i];
//       ques_array[i] = ques_array[j];
//       ques_array[j] = temp;
//     }

//     // ea5 ebb 8a5 6c
//     res.status(200).json({ result: ques_array });
//   } catch (err) {
//     console.log(err);
//     res.status(400).json(err);
//   }
// });

module.exports = router;
