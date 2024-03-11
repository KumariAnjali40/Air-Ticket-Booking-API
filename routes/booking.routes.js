const express = require('express');
const { auth } = require('../middleware/auth.middleware');

const Booking = require('../model/booking.model');

const bookingRouter = express.Router();






module.exports={
    bookingRouter,
}