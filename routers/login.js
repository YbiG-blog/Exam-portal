const express = require("express");
const User = require("../schema_details/user");
const bcrypt = require("bcrypt");
const router = new express.Router();


router.post("/login", async (req, res) => {
    const password = req.body.password;
    const email = req.body.email;
    const user_check = await User.findOne({email:(email || rollnum)});
   if(user_check){
    const user_password = user_check.password;
    const match_password = await bcrypt.compare(password,user_password);

      if (match_password) {
        res.status(201).send("this is verified user");
      } else {
        res.status(400).send("Wrong Password");
      }
    } else {
      res.send("Invalid details");
    }
});

module.exports = router;