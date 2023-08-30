const express = require("express");
const router = express.Router();
const Room = require("../models/room"); // Assuming your model is in "room.js"





router.get("/getrooms", async (req, res) => {
  try {
    const rooms = await Room.find(); // Fetch all rooms
    res.json(rooms);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/getroombyid", async (req, res) => {
  const roomid = req.body.roomid;
  try {
    const room = await Room.findOne({ _id: roomid });
    res.send(room);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});



// Add rooms to database route
router.post("/addroom", async (req, res) => {
  try {
    const newRoom = new Room(req.body);
    await newRoom.save();
    res.send("New Room added successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding rooms" });
  }
});





module.exports = router;
