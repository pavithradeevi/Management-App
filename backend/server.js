const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors');
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');

const app=express();

const PORT = process.env.PORT || 5000;

// connect to DB

mongoose
    .connect(process.env.MONGO_URI)
    .then(()=>{
        app.listen(PORT,()=>{
            console.log(`server Running on port ${PORT}`)
        })
    })
    .catch((err)=>console.log(err))