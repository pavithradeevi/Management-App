const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors');
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
const userRoute = require('./routes/userRoute');
const errorHandler = require('./middleWare/errorMiddleware.js')

const app=express();

const PORT = process.env.PORT || 5000;

// middleware
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(bodyParser.json())

// Routes Middleware

app.use("/api/users",userRoute)

// routes

app.get("/",(req,res)=>{
    res.send("Home Page")
});

// Error Middleware
app.use(errorHandler);

// connect to DB

mongoose
    .connect(process.env.MONGO_URI)
    .then(()=>{
        app.listen(PORT,()=>{
            console.log(`server Running on port ${PORT}`)
        })
    })
    .catch((err)=>console.log(err))