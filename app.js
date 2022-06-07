const cookieParser = require("cookie-parser");
const express = require("express");
const login_router = require("./routers/login");
const register_router = require("./routers/register");
const feedbackIns = require("./routers/feedback_ins")
const addquestion = require("./routers/addquestion");
require("./data_connection/data");

const app = express();

app.get("/",(req,res)=>{
  res.send("Hi,the API is working.");
})

//Middlewares
app.use(express.json());
app.use(cookieParser());

// routers -------------------
app.use("/",register_router);
app.use("/",login_router);
app.use("/",feedbackIns);
app.use("/", addquestion);

const port = process.env.PORT || 4200;
app.listen(port, () => {
  console.log("Server is running successfully on port : 4200");
});
