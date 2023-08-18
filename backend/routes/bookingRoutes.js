const express = require('express');
const router = express.Router();
const Booking = require('../models/booking');
const RoomModel = require('../models/room');
const moment = require('moment');

router.post('/bookroom', async (req, res) => {
  const { roomid, fromdate, todate, totalamount, totaldays, userid } = req.body;

  try {
    const room = await RoomModel.findById(roomid);

    if (!room) {
      console.log('Room not found');
      return res.status(400).json({ error: 'Room not found' });
    }

    const newbooking = new Booking({
      roomid,
      room: room.name,
      userid,
      roomid,
      fromdate: moment(fromdate, 'DD-MM-YYYY').format('DD-MM-YYYY'),
      todate: moment(todate, 'DD-MM-YYYY').format('DD-MM-YYYY'),
      totalamount,
      totaldays,
      transactionid: '7888',


    });

    const booking = await newbooking.save();
    console.log('Booking Saved:', booking);
    res.status(200).json({ message: 'Room Booked Successfully' });
  } catch (error) {
    console.error('Error Booking Room:', error);
    res.status(400).json({ error: 'Failed to book room' });
  }
});

module.exports = router;
