module.exports = (app) => {
    const ItineraryFlight = require("../controllers/itineraryFlight.controller.js");
    var router = require("express").Router();
    const { authenticateRoute } = require("../authentication/authentication");
  
    // Create a new Itinerary Flight for a Recipe
    router.post(
      "/itineraries/:itineraryId/itineraryFlights/",
      [authenticateRoute],
      ItineraryFlight.create
    );
  
    // Retrieve all Itinerary Flights
    router.get("/itineraryFlights/", ItineraryFlight.findAll);
  
    // Retrieve all Itinerary Flights for a Recipe
    router.get(
      "/itineraries/:itineraryId/itineraryFlights/",
      ItineraryFlight.findAllForItinerary
    );

    // Retrieve all Itinerary Flights for a Itinerary Step and include the flights
    router.get(
      "/itineraries/:itineraryId/itinerarySteps/:itineraryStepId/itineraryFlightsWithFlights/",
      ItineraryFlight.findAllForItineraryStepWithFlights
    );
    // Retrieve a single Itinerary Flight with id
    router.get(
      "/itineraries/:itineraryId/itineraryFlights/:id",
      ItineraryFlight.findOne
    );
  
    // Update a Itinerary Flight with id
    router.put(
      "/itineraries/:itineraryId/itineraryFlights/:id",
      [authenticateRoute],
      ItineraryFlight.update
    );
  
    // Delete a Itinerary Flight with id
    router.delete(
      "/itineraries/:itineraryId/itineraryFlights/:id",
      [authenticateRoute],
      ItineraryFlight.delete
    );
  
    // Delete all Itinerary Flights
    router.delete(
      "/itineraryFlights/",
      [authenticateRoute],
      ItineraryFlight.deleteAll
    );
  
    app.use("/travelapi", router);
  };