const express = require("express");

const app = express();

const dbconfig = require('./db');
const roomsRoute = require("./routes/roomRoutes");

app.use('/api/rooms', roomsRoute);


app.listen(5000, ()=>
    console.log("node server is started"));