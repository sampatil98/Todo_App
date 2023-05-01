const mongoose=require("mongoose");

const todoSchema=mongoose.Schema({
    "title":{type:String,require:true},
    "status":{type:Boolean,default:false},
    "userId":{type:String}
});

const TodoModel= mongoose.model("Todo_data",todoSchema);

module.exports={TodoModel};