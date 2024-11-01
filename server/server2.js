
import express from "express";
import cors from "cors"
import bodyParser from "body-parser"
import db from "./database.js"

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended : true}))
app.use(bodyParser.json());

app.get('/spline2',(req,res)=>{
    db.query("SELECT * FROM spline",(err,result)=>{
        if (err) {
            res.json(err)
            return;
        }
        res.json(result);
    })
})

app.listen("8088",()=>{
    console.log("http://localhost:8088")
})