const express = require("express");
const User = require("../schema_details/user");

const router = new express.Router();

router.get("/users", async (req, res) => {
  try {
    const alluser = await User.find();

    res.status(200).send(alluser);
  } catch (err) {
    res.status(500).send(err);
  }
});
module.exports = router;
