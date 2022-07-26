const express = require("express");
const router = new express.Router();
const FeedAnswer = require("../schema_details/feedresponse");
const FeedQuestion = require("../schema_details/ins_feed");
const User = require("../schema_details/user");
const atob = require("atob");
const verify = require("../middleware/auth");

router.post("/feedanswer", verify, async (req, res) => {
  try {const isVerified=true;
    const token = req.body.cookie_token;
    const dec = token.split(".")[1];
    const decode = JSON.parse(atob(dec)); //contains Userid
    console.log(dec);

    // const { question, Qid, value } = await req.body;
    const { Quserid, response, feedtext } = await req.body;
    let answer_create = new FeedAnswer({
      userId: decode,
      // question,
      // value,
      // Qid,
      Quserid,
      response,
      feedtext,
    });
    await answer_create.save();

    res.status(201).send({
      msg: "Response added for feedeback successfully",
      answer_create,
      isVerified
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = router;

// {
//     "msg": "Response added for feedeback successfully",
//     "answer_create": {
//         "userId": "62b448b6c20d541e9d920c74",
//         "response": [
//             {
//                 "question": "How is the portal ?",
//                 "value": "1",
//                 "Qid": "62b34e500c3fd54a027beb09",
//                 "_id": "62b44965c20d541e9d920c78"
//             },
//             {
//                 "question": "How is ?",
//                 "value": "1",
//                 "Qid": "62b3580e3d2b6d821de575dd",
//                 "_id": "62b44965c20d541e9d920c79"
//             },
//             {
//                 "question": "How  ?",
//                 "value": "1",
//                 "Qid": "62b358133d2b6d821de575df",
//                 "_id": "62b44965c20d541e9d920c7a"
//             },
//             {
//                 "question": "Ho ?",
//                 "value": "1",
//                 "Qid": "62b358183d2b6d821de575e1",
//                 "_id": "62b44965c20d541e9d920c7b"
//             },
//             {
//                 "question": "H?",
//                 "value": "1",
//                 "Qid": "62b3581e3d2b6d821de575e3",
//                 "_id": "62b44965c20d541e9d920c7c"
//             }
//         ],
//         "_id": "62b44965c20d541e9d920c77",
//         "__v": 0
//     }
// }
