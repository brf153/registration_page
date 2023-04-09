const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/registration_page", {
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(async ()=>{
    await console.log("connection successful")
}).catch(async (err)=>{
    await console.log(err);
})