const express = require("express");
const router = new express.Router();
const User = require("../schema_details/user");
const Total_admin_data = require("../schema_details/totaldata");

router.get("/register", async (req, res) => {
  try {
    const Usersdata = await User.find();
    res.status(201).send(Usersdata);
  } catch (err) {
    res.status(400).send(err);
  }
});
router.post("/register", async (req, res) => {
  const otp = Math.floor(Math.floor(100000 + Math.random() * 900000));
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
      isHosteler,
      // otpuser,
    } = await req.body;
    const userExist = await User.findOne({ rollNum });

    if (userExist) {
      return res.status(200).send({ msg: "User already exists." });
    }

    const user_create = new User({
      name,
      email,
      studentNum,
      rollNum,
      mobileNum,
      password: `Csi@${studentNum}`,
      adminPassword: `Admin@${studentNum}`,
      year,
      branch,
      gender,
      isHosteler,
    });
    Total_admin_data. total_registration+=1;
    const saveUser = await user_create.save();

    res.status(201).send(saveUser);
  } catch (err) {
    res.status(400).send(err);
  }
});

// getting the user

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
    res.status(200).json("Account deleted");
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
});

// Update a user

router.patch("/user/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    res.status(200).json("Account got updated");
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
});

module.exports = router;

// sample data
// {
//         "name": "Parkhi Garg",
//         "email": "parkhigarg27@gmail.com",
//         "studentNum":2011103,
//         "rollNum": 2000270110123,
//         "mobileNum": 7668043605,
//         "year": 2,
//         "branch": "CSIT",
//         "gender": "female",
//         "isHosteler":true,
//         "startTime":10,
//         "currentTime":15,
//         "endTime":20
// }
