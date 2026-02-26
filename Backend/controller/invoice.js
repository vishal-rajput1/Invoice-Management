const database = require("../Database/db");


const getinvoice=async(req,res)=>{
     try{
       const db=await database.connectDB();
       const result = await db.collection("invoice").find({}).toArray()
        res.send({
            "status": 200,
            "message": result
        })
    }
    catch(err)
{
      res.send({
        "status": 500,
        "massage": "something went wrong"+err,
        
    })
}}
const insertinvoice= async (req,res) => {
    try{
     const db=await database.connectDB();
    const result = await db.collection("invoice").insertOne(req.body);
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
        
        "massage": "something went wrong , please try again", 
    })
  }
}
catch(err)
{
      res.send({
        "status": 500,
        "massage": "something went wrong"+err,
        
    })
}
}

const updateinvoice=  async(req,res) =>{
    try{ 
         const db=await database.connectDB();
    const result = await db.collection("invoice").updateOne({id:parseInt(req.params.id)}, { $set: req.body  });
        if(result.acknowledged==true && result.matchedCount>0)
    {
    res.send({
        "status": 200,
        "massage": "record updated successfully",
         
    })
   }
   else
   {
     res.send({
        
        "massage": "something went wrong , please try again",
         
    })
   }
}       
    catch(err){
        res.send({
        "status": 500,
        "message" : "something went wrong"+err,
        })
    }
    } 

   const deleteinvoice= async(req,res) => {
    try{ 
         const db=await database.connectDB();
    const result = await db.collection("invoice").deleteOne({id:parseInt(req.params.id)});
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
    catch(err){
        res.send({
            "status": 400,
            "message": "something went wrong"+err,
        })
    }
}


module.exports={getinvoice,insertinvoice,updateinvoice,deleteinvoice}