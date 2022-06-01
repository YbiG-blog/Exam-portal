const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/exma_portalDB',{
    useNewUrlParser: true,
}).then(()=>{
    console.log("Data base is connected successfully")
}).catch((err)=>{
    console.log(err);
})
