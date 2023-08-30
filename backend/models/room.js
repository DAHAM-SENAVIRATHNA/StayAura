const mongoose = require("mongoose");

const roomSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    imageUrl: [{
        type: String,
    }],
    rentPerday:{
        type: Number
    },
    type: {
        type: String,
        required: true
    },

    maxPeople: {
        type: Number,
        required: true
    },
    phoneNumber: {
        type: String, // Changed to String assuming it's a phone number
        required: true
    },

    currentBooking: [{
        bookingid: String,
        fromdate: String,
        todate: String,
        userid: String,
        username: String,
        status: String
    }],


}, {
    timestamps: true,
});

const roomModel = mongoose.model('Room', roomSchema);
module.exports = roomModel;