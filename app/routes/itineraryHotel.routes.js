module.exports = (app) => {
    const ItineraryHotel = require("../controllers/itineraryHotel.controller.js");
    var router = require("express").Router();
    const { authenticateRoute } = require("../authentication/authentication");
  
    // Create a new Itinerary Hotel for a Recipe
    router.post(
      "/itineraries/:itineraryId/itineraryHotels/",
      [authenticateRoute],
      ItineraryHotel.create
    );
  
    // Retrieve all Itinerary Hotels
    router.get("/itineraryHotels/", ItineraryHotel.findAll);
  
    // Retrieve all Itinerary Hotels for a Itinerary
    router.get(
      "/itineraries/:itineraryId/itineraryHotels/",
      ItineraryHotel.findAllForItinerary
    );

    // Retrieve all Itinerary Hotels for a Itinerary Step and include the hotels
    router.get(
      "/itineraries/:itineraryId/itinerarySteps/:itineraryStepId/itineraryHotelsWithHotels/",
      ItineraryHotel.findAllForItineraryStepWithHotels
    );
  
    // Retrieve a single Itinerary Hotel with id
    router.get(
      "/itineraries/:itineraryId/itineraryHotels/:id",
      ItineraryHotel.findOne
    );
  
    // Update a Itinerary Hotel with id
    router.put(
      "/itineraries/:itineraryId/itineraryHotels/:id",
      [authenticateRoute],
      ItineraryHotel.update
    );
  
    // Delete a Itinerary Hotel with id
    router.delete(
      "/itineraries/:itineraryId/itineraryHotels/:id",
      [authenticateRoute],
      ItineraryHotel.delete
    );
  
    // Delete all Itinerary Hotels
    router.delete(
      "/itineraryHotels/",
      [authenticateRoute],
      ItineraryHotel.deleteAll
    );
  
    app.use("/travelapi", router);
  };
  