// mongoose is a library to manage data connections and manage database operations
const mongoose=require('mongoose');

const mongo_url=process.env.MONGO_CONN;

mongoose.connect(mongo_url)
    .then(()=>{
        console.log('MongoDB Connected...');
    }).catch((err)=>{
        console.log('MongoDB Connnection Error:', err);
        // Q- From where you got this err
    })