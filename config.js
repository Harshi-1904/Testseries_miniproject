const mongoose=require("mongoose");
const connect=mongoose.connect("mongodb://localhost:27017/user_auth");

connect.then(()=>{
    console.log("database connected successfully");
})
.catch(()=>{
    console.log("not connedted");
});

const LoginSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    }
});

const user=new mongoose.model("user",LoginSchema);

module.exports=user;