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

async function tableCheck (){
    console.log("Table check");
    const exists= await db.query(
    "SELECT * FROM pg_tables  WHERE tablename  = 'programmers'"      
    );

    if(exists.rows.length==0){
        console.log("Unos")
        await db.query(
        "Create table programmers( prog_id  serial unique primary key, name varchar(80), company_mail varchar(80), wage int, position varchar(80),years_of_experience int);"
        );
        await db.query("Insert into programmers(name, company_mail, wage, position, years_of_experience) values('Sanjeev','sanji@gmail.com0',2000, 'senior dev', 7), ('Wei', 'wei@fer.hr', 1500, 'mid dev', 4), ('Mark', 'mark@hotmail.com', 1250,'junior dev', 2);")
    }
}
    
       
   
tableCheck();    

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

