const express = require("express");
const User = require("../schema_details/user");
const bcrypt = require("bcrypt");
const router = new express.Router();


router.get("/admin",async(req,res)=>{
res.status(200).send({"msg":"This is admin page"});

});
router.post("/login", async (req, res) => {
  
  const password = req.body.password;
  const email = req.body.email;
  const user_check = await User.findOne({ email: email });
  if (user_check) {
    const user_password = user_check.password;
    const match_password = await bcrypt.compare(password, user_password);

    const cookie_token = await user_check.generateAuthToken();
    console.log(cookie_token);

    //add cookie
    res.cookie("jwt_csi", cookie_token, {secure:true,
      expires: new Date(Date.now() + 864000000),
      httpOnly: true,
    });
    if (match_password) {
if(user_check.isAdmin === true)
{res.status(201).send({"isAdmin": user_check.isAdmin});
  res.redirect("/admin");
}

else{
      res.status(201).send(`This is registered user and token for user is : ${cookie_token}`);
}
    } else {
      res.status(401).send({"msg":"Wrong Password"});
    }
  } else {
    res.status(401).send({"msg":"Invalid details"});
  }
});

module.exports = router;
