const express = require("express");
const User = require("../schema_details/user");

const router = new express.Router();

router.get("/alluser", async (req, res) => {
  try {
    const allUser = await User.find();
    const allUsermapArray = allUser.map((e) => e._id);
    res.status(200).send(allUsermapArray);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
