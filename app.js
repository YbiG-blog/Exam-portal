const cookieParser = require("cookie-parser");
const express = require("express");
const login_router = require("./routers/login");
const register_router = require("./routers/register");
require("./data_connection/data");
const auth_user = require("./authentication/authentication");

const app = express();

//Middlewares
app.use(express.json());
app.use(cookieParser());

// routers -------------------
app.use(register_router);
app.use(login_router);

// app.get("/home", auth_user, async(req,res)=>{
//   console.log(`cookie - : ${req.cookies.jwt_csi}`);
//   res.status(201).send("this is seceret page");
// })

const  port = process.env.PORT || 4200;
app.listen(port, () => {
  console.log("Server is runnig successfully on port : 4200");
});
