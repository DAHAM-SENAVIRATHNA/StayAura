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

module.exports = router;
