const database = require("../Database/db");


const getcoursedata=async(req,res)=>{
     try{
       const db=await database.connectDB();
       const result = await db.collection("courses").find({}).toArray()
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
const insertcoursedata= async (req,res) => {
    try{
     const db=await database.connectDB();
    const result = await db.collection("courses").insertOne(req.body);
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

const updatecoursedata=  async(req,res) =>{
    try{ 
         const db=await database.connectDB();
    const result = await db.collection("courses").updateOne({id:parseInt(req.params.id)}, { $set: req.body  });
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

   const deletecoursedata= async(req,res) => {
    try{ 
         const db=await database.connectDB();
    const result = await db.collection("courses").deleteOne({id:parseInt(req.params.id)});
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


module.exports={getcoursedata,insertcoursedata,updatecoursedata,deletecoursedata}