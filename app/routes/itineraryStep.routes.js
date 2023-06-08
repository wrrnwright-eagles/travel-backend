module.exports = (app) => {
  const itineraryStep = require("../controllers/itineraryStep.controller.js");
  var router = require("express").Router();
  const { authenticateRoute } = require("../authentication/authentication.js");

  // Create a new Itinerary Step for a Itinerary
  router.post(
    "/itinerary/:itineraryId/itineraryStep/",
    [authenticateRoute],
    itineraryStep.create
  );

  // Retrieve all Itinerary Steps
  router.get("/itineraryStep/", itineraryStep.findAll);

  // Retrieve all itinerary Steps for a Itinerary
  router.get(
    "/itinerary/:itineraryId/itineraryStep/",
    itineraryStep.findAllForActivity
  );

  // Retrieve all Recipe Ingredients for a Recipe Step and include the ingredients
  // still need to work on this one
  router.get(
    "/itinerary/:itineraryId/activity/:activityStepId/activityStepWithSteps/",
    itineraryStep.findAllForActivityStepWithSteps
  );

  // Retrieve a single Itinerary Step with id
  router.get(
    "/itinerary/:itineraryId/itineraryStep/:id",
    itineraryStep.findOne
  );

  // Update a Itinerary Step with id
  router.put(
    "/itinerary/:itineraryId/itineraryStep/:id",
    [authenticateRoute],
    itineraryStep.update
  );

  // Delete a Itinerary Step with id
  router.delete(
    "/itinerary/:itineraryId/itineraryStep/:id",
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
