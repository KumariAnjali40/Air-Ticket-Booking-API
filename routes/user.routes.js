const express=require('express');
const User = require('../model/user.model');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');


const userRouter=express.Router();

//user register
userRouter.post('/api/register',(req,res)=>{
    const {name,email,password}=req.body;

    try{
        bcrypt.hash(password,5,async(err,hash)=>{
           if(err){
            res.status(200).json({ error: err });
           }else{
            const user=new User({name,email,password:hash});
            await user.save();
            console.log(user);
            res.status(200).json({msg:"Hey! user You are successfully Register"});
           }
        })
    }
    catch(err){
        res.status(400).json({msg:err});
    }
})

//login
userRouter.post('/api/login',async(req,res)=>{
    const {email,password}=req.body;
    try{
       const user = await User.findOne({email});
       if(user){
        bcrypt.compare(password,user.password,(err,result)=>{
            if(result){
                const token=jwt.sign({userID:user._id},"Anjali",{expiresIn:"1d"});
                res.status(200).json({msg:"Login Successfull!",token});
            }else{
                res.status(200).json({msg:"Wrong Password"});
            }
        })
       }
    }
    catch(err){
        res.status(400).json({msg:"Please register first, wrong Credential"});
        console.log(err);
    }
})



module.exports={
    userRouter,
}