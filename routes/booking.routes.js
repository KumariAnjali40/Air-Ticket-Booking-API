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
bookingRouter.get('/api/dashboard', auth, async (req, res) => {
    try {
      const bookings = await Booking.find({ user: req.body.userID }).populate('user flight');
      res.status(200).json(bookings);
    } catch (error) {
      res.status(500).send(error.message);
    }
});


//put booking 

bookingRouter.put('/api/dashboard/:id', auth, async (req, res) => {
    try {
      const { flightId } = req.body;
      const booking = await Booking.findByIdAndUpdate(
        req.params.id,
        {
          user: req.body.userID,
          flight: flightId
        },
        { new: true }
      );
      if (!booking) return res.status(404).send('Booking not found');
      res.status(204).send('Booking details updated successfully');
    } catch (error) {
      res.status(500).send(error.message);
    }
});
  

//delete 

bookingRouter.delete('/api/dashboard/:id', auth, async (req, res) => {
    try {
      const booking = await Booking.findByIdAndDelete(req.params.id);
      if (!booking) return res.status(404).send('Booking not found');
      res.status(202).send('Booking deleted successfully');
    } catch (error) {
      res.status(500).send(error.message);
    }
});

module.exports={
    bookingRouter,
}