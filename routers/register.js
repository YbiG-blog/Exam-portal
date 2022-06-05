const express = require("express");
const User = require("../schema_details/user");
const router = new express.Router();

/*router.get("/register", async (req, res) => {
  try {
    const Usersdata = await User.find();
    res.status(201).send(Usersdata);
  } catch (err) {
    res.status(400).send(err);
  }
});*/
router.post("/register", async (req, res) => {
  try {
   // const password = req.body.password;
    //const checkpassword =
    //  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
   // const opt_num = Math.floor(1000 + Math.random() * 9000);
 const {name, email, studentNum, rollNum, mobileNum, year, branch, gender, isHosteler, startTime, currentTime, endTime }= await req.body;
 const userExist=await User.findOne({rollNum});

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

  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;