module.exports = (app) => {
  const Itinerary = require("../controllers/itinerary.controller.js");
  const { authenticateRoute } = require("../authentication/authentication");
  var router = require("express").Router();

  // Create a new Itinerary
  router.post("/itinerary/", [authenticateRoute], Itinerary.create);

  // Retrieve all Itineraries for user
  router.get(
    "/itinerary/user/:userId",
    [authenticateRoute],
    Itinerary.findAllForUser
  );

  // Retrieve all published Itineraries
  router.get("/itinerary/", Itinerary.findAllPublished);

  // Retrieve a single Itinerary with id
  router.get("/itinerary/:id", Itinerary.findOne);

  // Update a Itinerary with id
  router.put("/itinerary/:id", [authenticateRoute], Itinerary.update);

  // Delete a Itinerary with id
  router.delete("/itinerary/:id", [authenticateRoute], Itinerary.delete);

  // Delete all Itineraries
  router.delete("/itinerary/", [authenticateRoute], Itinerary.deleteAll);

  app.use("/travelapi", router);
};
