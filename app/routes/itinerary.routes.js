module.exports = (app) => {
  const Itinerary = require("../controllers/itinerary.controller.js");
  const { authenticateRoute } = require("../authentication/authentication");
  var router = require("express").Router();

  // Create a new Itinerary
  router.post("/itineraries/", [authenticateRoute], Itinerary.create);

  // Retrieve all Itineraries for user
  router.get(
    "/itineraries/user/:userId",
    [authenticateRoute],
    Itinerary.findAllForUser
  );

  // Retrieve all published Itineraries
  router.get("/itineraries/", Itinerary.findAllPublished);

  // Retrieve a single Itinerary with id
  router.get("/itineraries/:id", Itinerary.findOne);

  // Update a Itinerary with id
  router.put("/itineraries/:id", [authenticateRoute], Itinerary.update);

  // Delete a Itinerary with id
  router.delete("/itineraries/:id", [authenticateRoute], Itinerary.delete);

  // Delete all Itineraries
  router.delete("/itineraries/", [authenticateRoute], Itinerary.deleteAll);

  app.use("/travelapi", router);
};
