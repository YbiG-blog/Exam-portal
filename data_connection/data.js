const mongoose = require("mongoose");
require("dotenv").config();



mongoose.connect(
    process.env.MONGO_DATA_BASE,

    {
      useNewUrlParser: true,
    }
  )
  .then(() => {
    console.log("Data base is connected successfully");
  })
  .catch((err) => {
    console.log(err);
  });
//sample data
/*{
        "name":"Nate",
        "email":"hey@gmail.com",
        "studentNum":"1987",
        "rollNum":"789",
        "mobileNum":"8840279978",
        "year":"2",
        "branch":"cse",
        "gender":"female",
        "isHosteler": "true",
        "startTime":"q",
        "currentTime" : "now",
        "endTime":"end"
      }*/
