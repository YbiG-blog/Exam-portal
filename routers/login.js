const express = require("express");
const User = require("../schema_details/user");
const bcrypt = require("bcrypt");
const router = new express.Router();

router.get("/admin", async (req, res) => {
  res.send("This is admin page");
});
router.post("/login", async (req, res) => {
  
  const password = req.body.password;
  const studentNum = req.body.studentNum;
  const user_check = await User.findOne({ studentNum: studentNum });
  if (user_check) {
    const user_password = user_check.password;
    const match_password = await bcrypt.compare(password, user_password);

    if (match_password) {const cookie_token = await user_check.generateAuthToken();
      console.log(cookie_token);
  
      //add cookie
      res.cookie("jwt_csi", cookie_token, {secure:true,
        expires: new Date(Date.now() + 864000000),
        httpOnly: true,
      });

      if (user_check.isAdmin === true) {
        res.status(201).send({ "isAdmin": user_check.isAdmin });
        res.redirect("/admin");
      } else {
        res
          .status(201)
          .send(
            `This is verified user and token for user is : ${cookie_token.token}`
          );
      }
    } else {
      res.status(400).send({ msg: "Wrong Password" });
    }
  } else {
    res.status(400).send({ msg: "Invalid details" });
  }
});

module.exports = router;
