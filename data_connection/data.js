const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://yash7906:ybig2121@cluster0.gnqwd.mongodb.net/exma_portalDB",{
    useNewUrlParser: true,
}).then(()=>{
    console.log("Data base is connected successfully")
}).catch((err)=>{
    console.log(err);
})
