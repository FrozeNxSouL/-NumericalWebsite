import express from "express";
import cors from "cors"
import bodyParser from "body-parser"
import db from "./database.js"


const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/bisection",(req,res) => {
    db.query("SELECT * FROM bisection",(err,result)=>{
        if (err) {
            res.json(err)
            return;
        }
        res.json(result);
    })
})

app.get("/graphical",(req,res) => {
    db.query("SELECT * FROM graphical",(err,result)=>{
        if (err) {
            res.json(err)
            return;
        }
        res.json(result);
    })
})

app.get("/falseposition",(req,res) => {
    db.query("SELECT * FROM falseposition",(err,result)=>{
        if (err) {
            res.json(err)
            return;
        }
        res.json(result);
    })
})

app.get("/onepoint",(req,res) => {
    db.query("SELECT * FROM onepoint",(err,result)=>{
        if (err) {
            res.json(err)
            return;
        }
        res.json(result);
    })
})

app.get("/newtonraphson",(req,res) => {
    db.query("SELECT * FROM newtonraphson",(err,result)=>{
        if (err) {
            res.json(err)
            return;
        }
        res.json(result);
    })
})

app.get("/secant",(req,res) => {
    db.query("SELECT * FROM secant",(err,result)=>{
        if (err) {
            res.json(err)
            return;
        }
        res.json(result);
    })
})

app.get("/trapezoidal",(req,res) => {
    db.query("SELECT * FROM trapezoidal",(err,result)=>{
        if (err) {
            res.json(err)
            return;
        }
        res.json(result);
    })
})

app.get("/compositetrapezoidal",(req,res) => {
    db.query("SELECT * FROM compositetrapezoidal",(err,result)=>{
        if (err) {
            res.json(err)
            return;
        }
        res.json(result);
    })
})

app.get("/simpsons",(req,res) => {
    db.query("SELECT * FROM simpsons",(err,result)=>{
        if (err) {
            res.json(err)
            return;
        }
        res.json(result);
    })
})

app.get("/compositesimpsons",(req,res) => {
    db.query("SELECT * FROM compositesimpsons",(err,result)=>{
        if (err) {
            res.json(err)
            return;
        }
        res.json(result);
    })
})

app.listen("8080",()=>{
    console.log("http://localhost:8080")
})