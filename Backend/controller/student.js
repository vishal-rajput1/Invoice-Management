const database = require("../Database/db");
const { verifyToken } = require("../Auth/auth");

const getstudentdata=async(req,res)=>{
     try{
            const token = req.headers.authorization;
        if (!token) {
          return res.status(401).json({
            message: "Access denied. No token provided."
          });
        }
    
        verifyToken(token);
       const db=await database.connectDB();
       const result = await db.collection("student").find({}).toArray()
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
const insertstudentdata= async (req,res) => {
    try{ const token = req.headers.authorization;
   if (!token) {
      return res.status(401).json({
        message: "Access denied. No token provided."
      });
    }

    verifyToken(token);
     const db=await database.connectDB();
    const result = await db.collection("student").insertOne(req.body);
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

const updatestudentdata=  async(req,res) =>{
    try{ const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({
        message: "Access denied. No token provided."
      });
    }

    verifyToken(token);
         const db=await database.connectDB();
    const result = await db.collection("student").updateOne({id:parseInt(req.params.id)}, { $set: req.body  });
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

   const deletestudentdata= async(req,res) => {
    try{ 
        const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({
        message: "Access denied. No token provided."
      });
    }

    verifyToken(token);
         const db=await database.connectDB();
    const result = await db.collection("student").deleteOne({id:parseInt(req.params.id)});
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


module.exports={getstudentdata,insertstudentdata,updatestudentdata,deletestudentdata}