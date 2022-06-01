const express = require("express");
require("./data_connection/data");
const User = require("./schema_details/user");
const app = express();

//Middlewares
app.use(express.json());

app.get("/register", async (req, res) => {
  try {
    const Usersdata = await User.find();
    res.status(201).send(Usersdata);
  } catch (err) {
    res.status(400).send(err);
  }
});
app.post("/register", async (req, res) => {
  try {
    const password = req.body.password;
    const checkpassword = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    const opt_num = Math.floor(1000 + Math.random() * 9000);
    if(checkpassword.test(password)){
    const user_create = new User({
      Name: req.body.Name,
      email: req.body.email,
      rollnum: req.body.rollnum,
      mobileNumber: req.body.mobileNumber,
      password: password,
      year: req.body.year,
      branch: req.body.branch,
      gender: req.body.gender,
      otp_val: opt_num,
    });
    const new_user = await user_create.save();
    res.status(201).send(new_user);
}
else{
    res.status(400).send("password formate is not correct");  
}
  } catch (err) {
    res.status(400).send(err);
  }
});

app.listen(4200, () => {
  console.log("Server is runnig successfully on port : 4200");
});
