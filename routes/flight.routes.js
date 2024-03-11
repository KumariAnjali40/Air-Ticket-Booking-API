const express=require('express');
const Flight= require('../model/flight.model');
const { auth } = require('../middleware/auth.middleware');
const flightRouter = express.Router();



flightRouter.get('/api/flights',async(req,res)=>{
    try {
        const flights = await Flight.find();
        res.status(200).json(flights);
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




module.exports={
    flightRouter,
}