module.exports = (app) => {
  const Location = require("../controllers/location.controller.js");
  var router = require("express").Router();
  const { authenticateRoute } = require("../authentication/authentication");

  // Create a new Location
  router.post("/location/", [authenticateRoute], Location.create);

  // Retrieve all Locations
  router.get("/location/", Location.findAll);

  // Retrieve a single Location with locationId
  router.get("/location/:id", Location.findOne);

  // Update an Location with locationId
  router.put("/location/:id", [authenticateRoute], Location.update);

  // Delete an Location with locationId
  router.delete("/location/:id", [authenticateRoute], Location.delete);

  // Create a new Location
  router.delete("/location/", [authenticateRoute], Location.deleteAll);

  app.use("/travelapi", router);
};
