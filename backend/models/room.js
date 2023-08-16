const mongoose = require("mongoose");

const roomSchema = mongoose.Schema({

    name : {
        type: String,
        required: true
    },

    maxPeople : {
        type: Number,
        required: true
    },

    phoneNumber : {
        type: Number,
        required: true
    },

    rentPerday : {
        type: Number,
        required: true
    },

    imagesUrl : [],
    currentBooking : [],
    type: {
        type: String,
        required: true
    },

    description : {
        type: String,
        required: true
    },


}, 

{
    timestamp : true,
    
})

const roomModel = mongoose.model('rooms', roomSchema);

module.exports = roomModel;