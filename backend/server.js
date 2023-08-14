const express = require("express");

const app = express();

const dbconfig = require('./db');

app.listen(5000, ()=>
    console.log("node server is started"));