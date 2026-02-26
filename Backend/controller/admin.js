const database=require('../Database/db')
const jwt = require("jsonwebtoken");
const SECRET_KEY = "softech@123";

const searchuser=async (req,res) => {
    try{
     const db=await database.connectDB();
     const {useremail,password}= req.body;
    const result = await db.collection("user").findOne({"email":useremail});
    if(!result){
        return res.status(400).json({ message: "Invalid credentials"})
    }
    if (result.password!=req.body.password){
        return res.status(400).json({ message: "Invalid Password"})
    }
  else{
    let token= generateToken({ email: useremail },SECRET_KEY,"1h") 
   res.send({
        "status": 200,
        "message": "Login successfully",
        "token":token
         
    })
}}
    catch(err)
{
      res.send({
        "status": 500,
        "message": "something went wrong"+err,
        
    })
}}
const postuser= async (req,res) => {
    try{
         let resultnew=jwt.verify(req.body.token,SECRET_KEY)
            if(resultnew)
            {
     const db=await database.connectDB();
    const result = await db.collection("user").insertOne(req.body);
    if(result.acknowledged==true)
    {
    res.send({
        "status": 200,
        "massage": "record inserted successfully",
         
    })
   }
   else
   {
     res.send({
        
        "me ssage": "something went wrong , please try again",
         
    })
   }
}}
catch(err)
{
      res.send({
        "status": 500,
        "massage": "something went wrong"+err,
        
    })
}
}

const updateuser=  async(req,res) =>{
    try{
         let resultnew=jwt.verify(req.body.token,SECRET_KEY)
            if(resultnew)
            {
         const db=await database.connectDB();
    const result = await db.collection("user").updateOne({id:parseInt(req.params.id)}, { $set: req.body  });
        if(result.acknowledged==true && result.matchedCount>0)
    {
    res.send({
        "status": 200,
        "massage": "record updated successfully",   
    })
   }
   else
   {
     res.send({"massage": "something went wrong , please try again",})
   }
}
}    
    catch(err){
        res.send({
        "status": 500,
        "message" : "something went wrong"+err,
        })
    }
    } 

   const deleteuser= async(req,res) => {
    try{
         let resultnew=jwt.verify(req.body.token,SECRET_KEY)
            if(resultnew)
            {
         const db=await database.connectDB();
    const result = await db.collection("user").deleteOne({id:parseInt(req.params.id)});
     if(result.acknowledged==true && result.deletedCount>0)
    {
    res.send({
        "status": 200,
        "massage": "record deleted successfully",
        "result":result
         
    })
   }
   else
   {
     res.send({
        
        "massage": "Record not found , please try again with diffrent name",
         
    })
   }}
    }
    catch(err){
        res.send({
            "status": 400,
            "message": "something went wrong"+err,
        })
    }
}

function generateToken(payload,SECRET_KEY,expiresIn) {
   
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
}
module.exports={searchuser,postuser,updateuser,deleteuser}