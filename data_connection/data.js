const mongoose = require("mongoose");
<<<<<<< HEAD

mongoose
  .connect(
    `mongodb+srv://yash7906:ybig2121@cluster0.gnqwd.mongodb.net/exma_portalDB`,
=======
mongoose
  .connect(
    "mongodb+srv://yash7906:ybig2121@cluster0.gnqwd.mongodb.net/exma_portalDB",
>>>>>>> 17b3ede1f3942ca80134496313eb41ca03471c3e
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
