const express = require('express');
const {connection}=require('./db');
const {userRouter} = require('./routes/user.routes');
const app=express();


app.use(express.json());

app.use("/users",userRouter);

app.get('/',(req,res)=>{
    res.send("hello");
})




app.listen(4500,async()=>{
    try{
       await connection,
       console.log("connected to db");
       console.log("Server is running at port 4500");
    
    }
    catch(err){
        console.log(err);
    }
    
})