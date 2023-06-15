module.exports = (app) => {
    const ItineraryParticipants = require("../controllers/itineraryParticipants.controller.js");
    var router = require("express").Router();
    const { authenticateRoute } = require("../authentication/authentication");
  
    // Create a new Itinerary Participant
    router.post(
      "/itineraries/:itineraryId/itineraryParticipants/",
      [authenticateRoute],
      ItineraryParticipants.create
    );
  
    // Retrieve all Itinerary Participants
    router.get("/itineraryParticipants/", ItineraryParticipants.findAll);
  
    // Update a Itinerary Participant with id
    router.put(
      "/itineraries/:itineraryId/itineraryParticipants/:id",
      [authenticateRoute],
      ItineraryParticipants.update
    );
  
    // Delete a Itinerary Participant with id
    router.delete(
      "/itineraries/:itineraryId/itineraryParticipants/:id",
      [authenticateRoute],
      ItineraryParticipants.delete
    );
  
    // Delete all Itinerary Participants
    router.delete(
      "/itineraryParticipants/",
      [authenticateRoute],
      ItineraryParticipants.deleteAll
    );

    // Retrieve all Participants for a specific Itinerary
    router.get(
    "/itineraries/:itineraryId/participants/",
    ItineraryParticipants.findAllForItinerary
  );
  
    app.use("/travelapi", router);
  };
  