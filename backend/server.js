const express = require("express");
const cors = require("cors");


const app = express();
app.use(cors())
app.use(express.json())


const dbconfig = require('./db');
const roomsRoute = require("./routes/roomRoutes");
const usersRoute = require("./routes/userRoute");


app.use('/api/rooms', roomsRoute);
app.use('/api/users', usersRoute);


app.listen(5000, () =>
    console.log("node server is started"));
