const express = require("express");
const User = require("../schema_details/user");
const bcrypt = require("bcrypt");
const router = new express.Router();

router.get("/admin", async(req,res)=>{
  res.send("this is admin page");
})
router.post("/login", async (req, res) => {
  const password = req.body.password;
  const email = req.body.email;
  const user_check = await User.findOne({ email: email });
  if (user_check) {
    const user_password = user_check.password;
    const match_password = await bcrypt.compare(password, user_password);

    const cookie_token = await user_check.generateAuthToken();
    console.log(cookie_token.id);

    //add cookie
    res.cookie("jwt_csi", cookie_token, {
      expires: new Date(Date.now() + 864000000),
      httpOnly: true,
    });
    if (match_password) {
if(user_check.is_admin === 1)
{
  res.redirect("/admin")
}
else{
      res.status(201).send(`this is verified user and token for uer is : ${cookie_token.token}`);
}
    } else {
      res.status(400).send("Wrong Password");
    }
  } else {
    res.status(400).send("Invalid details");
  }
});

module.exports = router;
