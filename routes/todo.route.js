const {Router}=require("express");
const bcrypt=require("bcrypt");
const {TodoModel}=require("../model/todo.model");
const jwt=require("jsonwebtoken");

const todoRouter=Router();

todoRouter.post("/create",async(req,res)=>{
    try{
       
        const newtodo= new TodoModel(req.body);
        // const is_present= await TodoModel.findOne({email:newtodo.email});
        // if(is_present){
        //     res.status(200).send({"msg":"User already Present please login"});
        // }else{
            await newtodo.save();
            res.status(200).json({"msg":"New TODO Added"});
        // }
        

    }catch(err){
        res.status(400).json(err.message)
    }
});

todoRouter.get("/",async(req,res)=>{
    const {userId}=req.body;
    const {complete}=req.query;
    try{
        
        if(complete){
            let data= await TodoModel.find({status:true});
            res.status(200).json({"todos":data});
        }else{
            let data= await TodoModel.find({userId});
            res.status(200).json({"todos":data});
        }
        

    }catch(err){
        res.status(400).json(err.message);
    }
});

todoRouter.patch("/update/:id",async(req,res)=>{
    const {id}=req.params;
    try{
        await TodoModel.findByIdAndUpdate({_id:id},req.body);
        res.status(200).json({"msg":"TODO updated"});

    }catch(err){
        res.status(400).json(err.message);
    }
});

todoRouter.delete("/delete/:id",async(req,res)=>{
    const {id}=req.params;
    try{
        await TodoModel.findByIdAndDelete({_id:id});
        res.status(200).json({"msg":"TODO Deleted"});

    }catch(err){
        res.status(400).json(err.message);
    }
});

module.exports={todoRouter};


