const express = require('express');
const { auth } = require('../middleware/auth.middleware');

const Booking = require('../model/booking.model');

const bookingRouter = express.Router();

//post booking ..
bookingRouter.post('/api/booking', auth, async (req, res) => {
    try {
      const { flightId } = req.body;
      const booking = new Booking({
        user: req.body.userID,
        flight: flightId
      });
      await booking.save();
      res.status(201).send('Booking successful');
    } catch (error) {
      res.status(500).send(error.message);
    }
});


//get booking..
bookingRouter.get('/dashboard', auth, async (req, res) => {
    try {
      const bookings = await Booking.find({ user: req.body.userID }).populate('user flight');
      res.status(200).json(bookings);
    } catch (error) {
      res.status(500).send(error.message);
    }
});


//
  

module.exports={
    bookingRouter,
}