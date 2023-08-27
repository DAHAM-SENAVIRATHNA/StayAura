const express = require('express');
const router = express.Router();
const Booking = require('../models/booking');
const RoomModel = require('../models/room');
const moment = require('moment');
const { v4: uuidv4 } = require('uuid');
const stripe = require('stripe')('sk_test_51Ngl6bBXDV8VVuFBQs86b4ZeOLkWVuuZ2uevWn396M8HAPfbTWiaAslujgJ25rppCpHUD6CKCLLrXj2kxfHJMfDS00DdkAkfCY'); // Replace with your actual Stripe secret key


router.post('/bookroom', async (req, res) => {
  const { roomid, fromdate, todate, totalamount, totaldays, userid, username, token } = req.body;

  try {
    // Create a customer in Stripe
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id
    });

    // Create a payment charge from stripe
    const payment = await stripe.charges.create({
      amount: totalamount * 100, // Amount should be in cents
      currency: 'LKR',
      customer: customer.id,
      receipt_email: token.email
    }, {

      // Unique Id Customer cannot be pay twice
      idempotencyKey: uuidv4()
    });

    if (payment) {
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
          username, 
          fromdate: moment(fromdate, 'DD-MM-YYYY').format('DD-MM-YYYY'),
          todate: moment(todate, 'DD-MM-YYYY').format('DD-MM-YYYY'),
          totalamount,
          totaldays,
          transactionid: payment.id // Use the Stripe payment ID as the transaction ID
        });

        const booking = await newbooking.save();

        // Save the bookings in the rooms inside an array to track the number of bookings for that particular room
        const roomval = await RoomModel.findOne({ _id: room._id });
        roomval.currentBooking.push({
          bookingid: booking._id,
          fromdate: moment(fromdate, 'DD-MM-YYYY').format('DD-MM-YYYY'),
          todate: moment(todate, 'DD-MM-YYYY').format('DD-MM-YYYY'),
          userid: userid,
          username: username,
          status: booking.status
        });

        await roomval.save();
        console.log('Booking Saved:', booking);
        return res.status(200).json({ message: 'Room Booked Successfully' });
      } catch (error) {
        console.error('Error Booking Room:', error);
        return res.status(400).json({ error: 'Failed to book room' });
      }
    }
  } catch (error) {
    console.error('Error processing payment:', error);
    return res.status(400).json({ error: 'Payment failed' });
  }
});


router.post('/getbookingsbyuserid', async (req, res) => {
  const { userid } = req.body;

  try {
    const bookings = await Booking.find({ userid: userid });

    if (!bookings) {
      return res.status(404).json({ error: 'No bookings found for this user' });
    }

    res.status(200).json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return res.status(500).json({ error: 'Failed to fetch bookings' });
  }

});

router.post('/cancelbooking', async (req, res) => {
  const { bookingid, roomid } = req.body;

  try {
    const bookingitem = await Booking.findOne({ _id: bookingid });

    bookingitem.status = 'cancelled';

    await bookingitem.save();

    const room = await RoomModel.findOne({ _id: roomid }); // Use RoomModel here

    const bookings = room.currentBooking;

    const temp = bookings.filter(booking => booking.bookingid.toString() !== bookingid);
    room.currentBooking = temp;
    await room.save();

    res.send("Your Booking Cancelled Successfully");
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.get("/getallbookings", async(req,res) => {
  try {
    const bookings = await Booking.find()
    res.send(bookings)
  } catch (error) {
    return res.status(400).json({ error });
  }
})


module.exports = router;
