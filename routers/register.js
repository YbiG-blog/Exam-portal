const express = require("express");
const User = require("../schema_details/user");
const router = new express.Router();


router.get("/register", async (req, res) => {
  try {
    const Usersdata = await User.find();
    res.status(201).send(Usersdata);
  } catch (err) {
    res.status(400).send(err);
  }
});
router.post("/register", async (req, res) => {
  try {
    const password = req.body.password;
    const checkpassword =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    const opt_num = Math.floor(1000 + Math.random() * 9000);
    if (checkpassword.test(password)) {
      const user_create = new User({
        name: req.body.name,
        email: req.body.email,
        rollnum: req.body.rollnum,
        mobileNumber: req.body.mobileNumber,
        password: password,
        year: req.body.year,
        branch: req.body.branch,
        gender: req.body.gender,
        otp_val: opt_num,
      });
if(user_create.email=== process.env.ADMIN_EMAIL) user_create.is_admin = 1;

      const new_user = await user_create.save();
      res.status(201).send(new_user);
    } else {
      res.status(400).send("password formate is not correct");
    }
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;