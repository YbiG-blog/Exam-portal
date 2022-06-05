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
<<<<<<< HEAD
<<<<<<< HEAD
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
      
if(user_create.password === process.env.ADMIN_PASSWORD) user_create.is_admin = 1;
=======
   // const password = req.body.password;
=======
    // const password = req.body.password;
>>>>>>> 49921148946610b248dd664c99b8df6061c1299d
    //const checkpassword =
    //  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    // const opt_num = Math.floor(1000 + Math.random() * 9000);
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
      startTime,
      currentTime,
      endTime,
    } = await req.body;
    const userExist = await User.findOne({ rollNum });

<<<<<<< HEAD
 if(userExist)
 {return res.status(200).send({"msg" : "User already exists."});}
 
 const user_create = new User({
        name,
        email,
        studentNum,
        rollNum,
        mobileNum,
        password: studentNum+ "@"+ mobileNum,
        year,
        branch,
        gender,
        isHosteler,
        startTime,
        currentTime,
        endTime
      });
/*if(user_create.email=== process.env.ADMIN_EMAIL) 
{user_create.isAdmin = true;
res.status(201).send({"isAdmin" : user_create.isAdmin});}
*/
  await user_create.save();
  
      res.status(201).send({"msg":"User registered successfully"});
>>>>>>> 90b94f8f1560e9ef8b7f79598e3b83a41e8e9a7c
=======
    if (userExist) {
      return res.status(200).send({ msg: "User already exists." });
    }
>>>>>>> 49921148946610b248dd664c99b8df6061c1299d

    const user_create = new User({
      name,
      email,
      studentNum,
      rollNum,
      mobileNum,
      password: studentNum + "@" + mobileNum,
      year,
      branch,
      gender,
      isHosteler,
      startTime,
      currentTime,
      endTime,
    });
    if (user_create.email === process.env.ADMIN_EMAIL) user_create.is_admin = 1;
  } catch (err) {
    res.status(400).send(err);
  }
});

//getting the user

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findbyId(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete a user

router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    res.status(200).json("Account deleted");
  } catch (err) {
    return res.status(500).json(err);
  }
});

// Update a user

router.put("/update", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    res.status(200).json("Account got updated");
  } catch (err) {
    return res.status(500).json(err);
  }
});

//instruction

//feedback

router.post("/feedback", async (req, res) => {
  try {
    const feedbacktext = {
      userfeedback: req.body.text,
    };

    const feedbackSchema = new feedback(feedbacktext);
    const fb = await feedbackSchema.save();
    res.status(200).send("successfully done");
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

module.exports = router;
