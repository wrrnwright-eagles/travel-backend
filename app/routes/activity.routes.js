module.exports = (app) => {
  const ActivityStep = require("../controllers/activity.controller.js");
  const { authenticateRoute } = require("../authentication/authentication");
  var router = require("express").Router();

  // Create a new Activity Step for a Itinerary
  router.post(
    "/itinerary/:itineraryId/activity/",
    [authenticateRoute],
    ActivityStep.create
  );

  // Retrieve all Activity Steps
  router.get("/activity/", ActivityStep.findAll);

  // Retrieve all Activity Steps for a Itinerary
  router.get("/itinerary/:itineraryId/activity/", ActivityStep.findAllForItinerary);
  // Retrieve all Activity Steps for a Itinerary and include the locations
  router.get(
    "/itinerary/:itineraryId/activityWithLocations/",
    ActivityStep.findAllForItineraryWithLocations
  );

  // Retrieve a single Activity Step with id
  router.get("/itinerary/:itineraryId/activity/:id", ActivityStep.findOne);

  // Update a Activity Step with id
  router.put(
    "/itinerary/:itineraryId/activity/:id",
    [authenticateRoute],
    ActivityStep.update
  );

  // Delete a Activity Step with id
  router.delete(
    "/itinerary/:itineraryId/activity/:id",
    [authenticateRoute],
    ActivityStep.delete
  );

  // Delete all Activity Steps
  router.delete("/activity/", [authenticateRoute], ActivityStep.deleteAll);

  app.use("/travelapi", router);
};
