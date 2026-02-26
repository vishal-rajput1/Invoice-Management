const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://vishal:vishal123@cluster01.kb5rvcp.mongodb.net/?appName=Cluster01";  // Local MongoDB
const client = new MongoClient(uri);

async function connectDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB!");

    const db = client.db("invoices"); // database name
   return db;
  } catch (err) {
    console.error(err);
  } 
}

module.exports = { connectDB };
