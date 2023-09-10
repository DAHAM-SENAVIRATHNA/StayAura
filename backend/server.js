
// Server
const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose');
const app = express();
const dbconfig = require('./db');
const roomsRoute = require("./routes/roomRoutes");
const usersRoute = require("./routes/userRoute");
const bookingsRoute = require("./routes/bookingRoutes");
const port = 5000;

app.use(cors())
app.use(express.json());
app.use('/api/rooms', roomsRoute);
app.use('/api/users', usersRoute);
app.use('/api/bookings', bookingsRoute);



app.listen(port, () =>
    console.log("node server is started"));
