const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_DATA_BASE,{
    useNewUrlParser: true,
}).then(()=>{
    console.log("Data base is connected successfully")
}).catch((err)=>{
    console.log(err);
})
