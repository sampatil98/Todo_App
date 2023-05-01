const mongoose=require("mongoose");

const userSchema=mongoose.Schema({
    "name":{type:String,require:true},
    "email":{type:String,require:true},
    "password":{type:String,require:true},
    "city":{type:String,require:true},
    "mob_no":{type:Number,require:true},
    "profession":{type:String,require:true,enum:["student","empolyee"]}
});

const UserModel= mongoose.model("user_data",userSchema);

module.exports={UserModel};