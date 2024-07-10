export const verifyToken=(req,res,next)=>{
    const authHeader=req.headers.authorization;
    if(authHeader){ 
        jwt.verify(authHeader,"secret",(err)=>{
            if(err){
                res.status(401).json({message:"Invalid Token"})
        }
        next();
    });
    }else{res.sendStatus(401)
    };
}