module.exports = (app) => {
  const itineraryStep = require("../controllers/itineraryStep.controller.js");
  var router = require("express").Router();
  const { authenticateRoute } = require("../authentication/authentication.js");

  // Create a new Itinerary Step for a Itinerary
  router.post(
    "/itineraries/:itineraryId/itineraryStep/",
    [authenticateRoute],
    itineraryStep.create
  );

  // Retrieve all Itinerary Steps
  router.get("/itineraryStep/", itineraryStep.findAll);

  // Retrieve all itinerary Steps for a Itinerary
  router.get(
    "/itineraries/:itineraryId/itineraryStep/",
    itineraryStep.findAllForItinerary
  );

  // Retrieve all Itinerary Steps for an Itinerary and include the activities
  router.get(
    "/itineraries/:itineraryId/itineraryStepsWithActivities/",
    itineraryStep.findAllForItineraryWithActivities
  );

   // Retrieve all Itinerary Steps for an Itinerary and include the flights
   router.get(
    "/itineraries/:itineraryId/itineraryStepsWithFlights/",
    itineraryStep.findAllForItineraryWithFlights
  );

   // Retrieve all Itinerary Steps for an Itinerary and include the hotels
   router.get(
    "/itineraries/:itineraryId/itineraryStepsWithHotels/",
    itineraryStep.findAllForItineraryWithHotels
  );

  // Retrieve a single Itinerary Step with id
  router.get(
    "/itineraries/:itineraryId/itineraryStep/:id",
    itineraryStep.findOne
  );

  // Update a Itinerary Step with id
  router.put(
    "/itineraries/:itineraryId/itineraryStep/:id",
    [authenticateRoute],
    itineraryStep.update
  );

  // Delete a Itinerary Step with id
  router.delete(
    "/itineraries/:itineraryId/itineraryStep/:id",
    [authenticateRoute],
    itineraryStep.delete
  );

  // Delete all Itinerary Steps
  router.delete(
    "/itineraryStep/",
    [authenticateRoute],
    itineraryStep.deleteAll
  );

  app.use("/travelapi", router);
};
