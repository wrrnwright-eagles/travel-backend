module.exports = (app) => {
  const Flights = require("../controllers/flights.controller.js");
  const { authenticateRoute } = require("../authentication/authentication.js");
  var router = require("express").Router();

  // Create a new Flight
  router.post("/flights/", [authenticateRoute], Flights.create);

  // Retrieve all Flights for user
  router.get(
    "/flights/user/:userId",
    [authenticateRoute],
    Flights.findAllForUser
  );
  // Retrieve all published Flights
  router.get("/flights/", Flights.findAllPublished);
  // Retrieve a single Flight with id
  router.get("/flights/:id", Flights.findOne);

  // Update a Flight with id
  router.put("/flights/:id", [authenticateRoute], Flights.update);

  // Delete a Flights with id
  router.delete("/flights/:id", [authenticateRoute], Flights.delete);

  // Delete all Flights
  router.delete("/flights/", [authenticateRoute], Flights.deleteAll);

  app.use("/travelapi", router);
};
