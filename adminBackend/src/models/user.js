const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const UserSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique: true
    },
    phoneNumber:{
        type: Number.length(10),
        unique: true,
    },
    password:{
        type:String,
        required:true
    }
});
const UserModel=mongoose.model('users', UserSchema);
module.exports=UserModel;