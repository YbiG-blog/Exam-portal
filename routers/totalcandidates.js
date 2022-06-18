// total candidates registered
// total attendees
// total questions
// total feedback
// current active users

const express = require("express");
const router = new express.Router();
const User = require("../schema_details/user");
const db = require("../data_connection/data");

router.get("/totalcandidates", async (req, res) => {
  try {
    db.users.aggregate([{ $count: "myCount" }]);
    console.log(count);
    res.status(200).send({ msg: "done" });
  } catch (error) {
    console.log(error);
    res.status(400).send("error");
  }
});

module.exports = router;
