const express = require("express");
const router = express.Router();

const Room = require('../models/room');

// Add Api endpoints to fetch data

router.get("/getRooms", async(req, res, next) =>{

    try{
        const rooms = await Room.find({})
        return res.json({ rooms});

    } 
    catch (error){
        return res.status(400).json({ message: error});
    }  
});

module.exports = router;