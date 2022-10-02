const express = require("express");
const router = new express.Router();
const User = require("../models/user");
const sendEmail = require("../services/email");
const bcrypt = require("bcrypt");

router.post("/register", async (req, res) => {
  try {
    const {
      name,
      email,
      studentNum,
      rollNum,
      mobileNum,
      year,
      branch,
      gender,
      domain,
      isHosteler,
    } = req.body;
    const userExist = await User.findOne({
      $or: [{ rollNum }, { mobileNum }, { email }, { studentNum }],
    });

    if (userExist) {
      return res.status(406).send({ msg: "User already exists" });
    }

    const userCreate = new User({
      name,
      email,
      studentNum,
      rollNum,
      mobileNum,
      password: `${process.env.USERPASSWORD}@${studentNum}`,
      year,
      branch,
      gender,
      domain,
      isHosteler,
    });

    // bcrypt password
    const salt = await bcrypt.genSalt(10);
    userCreate.password = await bcrypt.hash(userCreate.password, salt);

    const saveUser = await userCreate.save();
    // sendEmail(email);
    res.status(201).send({
      message: "User Successfully Registered",
      id: saveUser._id,
    });
  } catch (error) {
    res.status(400).send(`err ${error}`);
  }
});

//getting user
router.get("/user/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// delete a user
router.delete("/user/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "This user id doesn't exist",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Account deleted",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
});

// Update a user
router.patch("/user/:id", async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    res.status(200).json("Account got updated");
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
});

module.exports = router;