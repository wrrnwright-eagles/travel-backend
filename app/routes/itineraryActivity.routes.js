module.exports = (app) => {
    const ItineraryActivity = require("../controllers/itineraryActivity.controller.js");
    var router = require("express").Router();
    const { authenticateRoute } = require("../authentication/authentication");
  
    // Create a new Itinerary Activity for a Itinerary
    router.post(
      "/itineraries/:itineraryId/itineraryActivities/",
      [authenticateRoute],
      ItineraryActivity.create
    );
  
    // Retrieve all Itinerary Activities
    router.get("/itineraryActivities/", ItineraryActivity.findAll);
  
    // Retrieve all Itinerary Activities for a Itinerary
    router.get(
      "/itineraries/:itineraryId/itineraryActivities/",
      ItineraryActivity.findAllForItinerary
    );

    // Retrieve all Itinerary Hotels for a Itinerary Step and include the hotels
    router.get(
      "/itineraries/:itineraryId/itinerarySteps/:itineraryStepId/itineraryActivitiesWithActivities/",
      ItineraryActivity.findAllForItineraryStepWithActivities
    );
  
    // Retrieve a single Itinerary Activity with id
    router.get(
      "/itineraries/:itineraryId/itineraryActivities/:id",
      ItineraryActivity.findOne
    );
  
    // Update a Itinerary Activity with id
    router.put(
      "/itineraries/:itineraryId/itineraryActivities/:id",
      [authenticateRoute],
      ItineraryActivity.update
    );
  
    // Delete a Itinerary Activity with id
    router.delete(
      "/itineraries/:itineraryId/itineraryActivities/:id",
      [authenticateRoute],
      ItineraryActivity.delete
    );
  
    // Delete all Itinerary Activities
    router.delete(
      "/itineraryActivities/",
      [authenticateRoute],
      ItineraryActivity.deleteAll
    );
  
    app.use("/travelapi", router);
  };
  