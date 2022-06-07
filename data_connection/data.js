const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://Delena:Delena123@cluster0.tglzo.mongodb.net/exam-portal",
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
