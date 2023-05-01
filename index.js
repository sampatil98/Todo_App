const express=require("express");
require("dotenv").config();
const cors = require('cors')

const {connection}=require("./config/db");
const {userRouter}=require("./routes/user.route");
const {todoRouter}=require("./routes/todo.route");
const {auth}=require("./middlewares/auth.middleware");

const app=express();

app.use(cors());
app.use(express.json());
app.use("/user",userRouter);

app.use(auth);
app.use("/user/todo",todoRouter);

app.listen(process.env.port,async()=>{
    try{
        await connection;
        console.log("connected to DB");
        console.log(`server is running at port ${process.env.port} `)
    }catch(err){
        console.log(err);
    }

})