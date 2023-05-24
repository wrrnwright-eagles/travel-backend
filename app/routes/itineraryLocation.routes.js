module.exports = (app) => {
  const itineraryLocation = require("../controllers/itineraryLocation.controller.js");
  var router = require("express").Router();
  const { authenticateRoute } = require("../authentication/authentication");

  // Create a new Itinerary Location for a Itinerary
  router.post(
    "/itinerary/:itineraryId/itineraryLocation/",
    [authenticateRoute],
    itineraryLocation.create
  );

  // Retrieve all Itinerary Locations
  router.get("/itineraryLocation/", itineraryLocation.findAll);

  // Retrieve all itinerary Locations for a Itinerary
  router.get(
    "/itinerary/:itineraryId/itineraryLocation/",
    itineraryLocation.findAllForRecipe
  );

  // Retrieve all Recipe Ingredients for a Recipe Step and include the ingredients
  // still need to work on this one
  router.get(
    "/itinerary/:itineraryId/activity/:activityStepId/activityStepWithLocations/",
    itineraryLocation.findAllForActivityStepWithLocations
  );

  // Retrieve a single Itinerary Location with id
  router.get(
    "/itinerary/:itineraryId/itineraryLocation/:id",
    itineraryLocation.findOne
  );

  // Update a Itinerary Location with id
  router.put(
    "/itinerary/:itineraryId/itineraryLocation/:id",
    [authenticateRoute],
    itineraryLocation.update
  );

  // Delete a Itinerary Location with id
  router.delete(
    "/itinerary/:itineraryId/itineraryLocation/:id",
    [authenticateRoute],
    itineraryLocation.delete
  );

  // Delete all Itinerary Locations
  router.delete(
    "/itineraryLocation/",
    [authenticateRoute],
    itineraryLocation.deleteAll
  );

  app.use("/travelapi", router);
};
