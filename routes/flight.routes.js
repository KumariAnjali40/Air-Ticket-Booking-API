const express=require('express');
const Flight= require('../model/flight.model');
const { auth } = require('../middleware/auth.middleware');
const flightRouter = express.Router();


/**
 * @swagger
 * tags:
 *   name: Flights
 *   description: Operations related to flights
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Flight:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         airline:
 *           type: string
 *         flightNo:
 *           type: string
 *         departure:
 *           type: string
 *         arrival:
 *           type: string
 *         departureTime:
 *           type: string
 *           format: date-time
 *         arrivalTime:
 *           type: string
 *           format: date-time
 *         seats:
 *           type: integer
 *         price:
 *           type: number
 */

/**
 * @swagger
 * /flights/api/flights:
 *   get:
 *     summary: Get all flights
 *     tags: [Flights]
 *     responses:
 *       200:
 *         description: List of all flights
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /flights/api/flight/{id}:
 *   get:
 *     summary: Get a specific flight by ID
 *     tags: [Flights]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Flight ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Details of the specified flight
 *       404:
 *         description: Flight not found
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /flights/api/flight:
 *   post:
 *     summary: Add a new flight
 *     tags: [Flights]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Flight'
 *     responses:
 *       201:
 *         description: Flight added successfully
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /flights/api/flight/{id}:
 *   put:
 *     summary: Update details of a specific flight by ID
 *     tags: [Flights]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Flight ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Flight'
 *     responses:
 *       204:
 *         description: Flight details updated successfully
 *       404:
 *         description: Flight not found
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /flights/api/flight/{id}:
 *   delete:
 *     summary: Delete a specific flight by ID
 *     tags: [Flights]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Flight ID
 *         schema:
 *           type: string
 *     responses:
 *       202:
 *         description: Flight deleted successfully
 *       404:
 *         description: Flight not found
 *       500:
 *         description: Internal Server Error
 */



flightRouter.get('/api/flight',async(req,res)=>{
    try {
        const flights = await Flight.find();
        res.status(200).json(flights);
      } catch (error) {
        res.status(500).send(error.message);
      }
});




//get flight by id 

flightRouter.get('/api/flight/:id', async (req, res) => {
    try {
      const flight = await Flight.findById(req.params.id);
      if (!flight) return res.status(404).send('Flight not found');
      res.status(200).json(flight);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });


//post flight 

flightRouter.post('/api/flight', auth, async (req, res) => {
    try {
      const { airline, flightNo, departure, arrival, departureTime, arrivalTime, seats, price } = req.body;
      const flight = new Flight({
        airline,
        flightNo,
        departure,
        arrival,
        departureTime,
        arrivalTime,
        seats,
        price
      });
      await flight.save();
      res.status(201).send('Flight added successfully');
    } catch (error) {
      res.status(500).send(error.message);
    }
  });



  //update the flight 

  flightRouter.put('/api/flight/:id', auth, async (req, res) => {
    try {
      const { airline, flightNo, departure, arrival, departureTime, arrivalTime, seats, price } = req.body;
      const flight = await Flight.findByIdAndUpdate(
        req.params.id,
        {
          airline,
          flightNo,
          departure,
          arrival,
          departureTime,
          arrivalTime,
          seats,
          price
        },
        { new: true }
      );
      if (!flight) return res.status(404).send('Flight not found');
      res.status(204).send('Flight details updated successfully');
    } catch (error) {
      res.status(500).send(error.message);
    }
  });



// delete the flight ..
flightRouter.delete('/api/flight/:id', auth, async (req, res) => {
    try {
      const flight = await Flight.findByIdAndDelete(req.params.id);
      if (!flight) return res.status(404).send('Flight not found');
      res.status(202).send('Flight deleted successfully');
    } catch (error) {
      res.status(500).send(error.message);
    }
  });


module.exports={
    flightRouter,
}