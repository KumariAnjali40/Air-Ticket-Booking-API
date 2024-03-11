const jwt=require('jsonwebtoken');

const auth=async(req,res,next)=>{
   const token=req.headers.authorization?.split(" ")[1]; 
   if(token){
    try{
     const decoded=jwt.verify(token,"Anjali");
     if(decoded){
      //   console.log(decoded);
        req.body.userID=decoded.userID
        req.body.name=decoded.user
        next();
      }else{
        res.json({msg:"not authorized"});
      }
    }
    catch(err){
      console.log(err);
    }
   }else{
    res.json({msg:"Please Login"})
   }
}


module.exports={
    auth,
}