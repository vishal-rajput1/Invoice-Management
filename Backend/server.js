const express=require("express")
const cors=require('cors')
const indexRouter=require('./Router/index')

const app=express()
app.use(express.json())
app.use(cors())

app.use("/",indexRouter)
app.listen(5000,(err)=>{
    if (err) {
        console.log("something went wrong")
    }
    console.log("API listen on localhost 5000")
})
