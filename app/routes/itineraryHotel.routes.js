module.exports = (app) => {
    const ItineraryHotel = require("../controllers/itineraryHotel.controller.js");
    var router = require("express").Router();
    const { authenticateRoute } = require("../authentication/authentication");
  
    // Create a new Itinerary Hotel for a Recipe
    router.post(
      "/hotels/:hotelId/itineraryHotels/",
      [authenticateRoute],
      ItineraryHotel.create
    );
  
    // Retrieve all Itinerary Hotels
    router.get("/itinerary Hotels/", ItineraryHotel.findAll);
  
    // Retrieve all Itinerary Hotels for a Recipe
    router.get(
      "/hotels/:hotelId/itineraryHotels/",
      ItineraryHotel.findAllForItinerary
    );
  
    // Retrieve a single Itinerary Hotel with id
    router.get(
      "/hotels/:hotelId/itineraryHotels/:id",
      ItineraryHotel.findOne
    );
  
    // Update a Itinerary Hotel with id
    router.put(
      "/hotels/:hotelId/itineraryHotels/:id",
      [authenticateRoute],
      ItineraryHotel.update
    );
  
    // Delete a Itinerary Hotel with id
    router.delete(
      "/hotels/:hotelId/itineraryHotels/:id",
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
  