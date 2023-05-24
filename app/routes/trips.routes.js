module.exports = (app) => {
  const Trips = require("../controllers/trips.controller.js");
  var router = require("express").Router();
  const { authenticateRoute } = require("../authentication/authentication.js");

  // Create a new Trip
  router.post("/trips/", [authenticateRoute], Trips.create);

  // Retrieve all Tripsnp
  router.get("/trips/", Trips.findAll);

  // Retrieve a single Trip with tripsId
  router.get("/trips/:id", Trips.findOne);

  // Update a Trip with tripsId
  router.put("/trips/:id", [authenticateRoute], Trips.update);

  // Delete a Trip with TripId
  router.delete("/trips/:id", [authenticateRoute], Trips.delete);

  // Create a new trip
  router.delete("/trips/", [authenticateRoute], Trips.deleteAll);

  app.use("/travelapi", router);
};
