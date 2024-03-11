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




//get flight by id 

flightRouter.get('/:id', async (req, res) => {
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