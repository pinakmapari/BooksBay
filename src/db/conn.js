const mongoose = require('mongoose')

mongoose.connect("mongodb://localhost:27017/userLogin", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(()=> {
    console.log(`Connection Successful`);
}).catch(()=>{
    console.log(`No connection`);
})