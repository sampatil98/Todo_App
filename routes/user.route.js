const {Router}=require("express");
const bcrypt=require("bcrypt");
const {UserModel}=require("../model/user.model");
const jwt=require("jsonwebtoken");

const userRouter=Router();

userRouter.post("/register",async (req,res) => {
    const {password}=req.body;
    try{
        bcrypt.hash(password,10,async(err,hash)=>{
            const newuser= new UserModel({...req.body,password:hash});
            await newuser.save();
            res.status(200).json({"msg":"User Added"})
        })

    }catch(err){
        res.status(400).json(err.message);
    }
});

userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    try{
        let user= await UserModel.findOne({email});
        
        if(user){
            bcrypt.compare(password,user.password,(err,result)=>{
                if(result){
                    const token= jwt.sign({userId:user["_id"],name:user.name},"sampatil");
                    res.status(200).json({"msg":"Login successful..","token":token});

                }else{
                    res.status(200).json({"msg":"WRONG Credentials..."})
                }
            })
        }else{
            res.status(404).json({"msg":"user not found"})
        }

    }catch(err){
        res.status(400).json(err.message)
    }
})


module.exports={userRouter};