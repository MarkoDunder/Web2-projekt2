require("dotenv").config();
const { request, response } = require("express");
const express= require("express");
const app= express();
const morgan=require("morgan");
const db=require("./db/index");
const crypto= require("crypto");
const cors = require("cors");

app.use(cors());

app.use(express.json());
const port=Number(process.env.PORT)|| 3001;

app.listen(port, ()=>{
    console.log(`server is listening on port ${port}`);
});

app.get("/api/v1/userInfo/:id", async (req,res)=>{
    try {
        const id=req.params.id;
        const results= await db.query('Select * from programmers where prog_id=$1',[id])
       
        res.status(200).json({
            status: 'success',
            data:results.rows
        })
    } 
    catch (error) {
    console.log(error.message);
    res.status(400).json({ message: "Please type in your correct identifier" });    
    }
})

app.get("/api/v1/user/:id", async (req,res)=>{
    try {
        const id=req.params.id;
        const faultyResults= await db.query(`Select * from programmers where prog_id=${id}`);

        res.status(200).json({
            status: 'success',
            data:faultyResults.rows
        });
    }
    catch (error) {
        console.log(error.message);   
    }
})