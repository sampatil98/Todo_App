const jwt=require("jsonwebtoken");

const auth=(req,res,next)=>{
    const token= req.headers.authorization
    if(token){

        try{
            
            const decode=jwt.verify(token.split(" ")[1],"sampatil");
            console.log(decode);
            if(decode){
                req.body.userId=decode.userId;
                console.log(req.body);
                next();
            }else{
                res.status(200).json({"msg":"Please Login..."})
            }

        }catch(err){
            res.status(400).json(err.message);
        }

    }else{
        res.status(200).json({"msg":"Please Login..."})
    }
}

module.exports={auth};