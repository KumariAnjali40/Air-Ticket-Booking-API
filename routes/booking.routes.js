const express = require('express');
const { auth } = require('../middleware/auth.middleware');

const Booking = require('../model/booking.model');

const bookingRouter = express.Router();


/**
 * @swagger
 * tags:
 *   name: Bookings
 *   description: Operations related to bookings
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Booking:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         user:
 *           type: object
 *           properties:
 *             _id:
 *               type: string
 *             name:
 *               type: string
 *             email:
 *               type: string
 *         flight:
 *           type: object
 *           properties:
 *             _id:
 *               type: string
 *             airline:
 *               type: string
 *             flightNo:
 *               type: string
 *             departure:
 *               type: string
 *             arrival:
 *               type: string
 *             departureTime:
 *               type: string
 *               format: date-time
 *             arrivalTime:
 *               type: string
 *               format: date-time
 *             seats:
 *               type: integer
 *             price:
 *               type: number
 */

/**
 * @swagger
 * /bookings/api/booking:
 *   post:
 *     summary: Book a flight
 *     tags: [Bookings]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               flightId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Booking successful
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /bookings/api/dashboard:
 *   get:
 *     summary: Get all bookings for the authenticated user
 *     tags: [Bookings]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of all bookings for the user
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /bookings/api/dashboard/{id}:
 *   put:
 *     summary: Update details of a specific booking by ID
 *     tags: [Bookings]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Booking ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               flightId:
 *                 type: string
 *     responses:
 *       204:
 *         description: Booking details updated successfully
 *       404:
 *         description: Booking not found
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /bookings/api/dashboard/{id}:
 *   delete:
 *     summary: Delete a specific booking by ID
 *     tags: [Bookings]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Booking ID
 *         schema:
 *           type: string
 *     responses:
 *       202:
 *         description: Booking deleted successfully
 *       404:
 *         description: Booking not found
 *       500:
 *         description: Internal Server Error
 */


















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