module.exports = (app) => {
  const Activity = require("../controllers/activity.controller.js");
  var router = require("express").Router();
  const { authenticateRoute } = require("../authentication/authentication");

  // Create a new Activity
  router.post("/activities/", [authenticateRoute], Activity.create);

  // Retrieve all Activity
  router.get("/activities/", Activity.findAll);

  // Retrieve a single Activity with activityId
  router.get("/activities/:id", Activity.findOne);

  // Update an Activity with activityId
  router.put("/activities/:id", [authenticateRoute], Activity.update);

  // Delete an Activity with activityId
  router.delete("/activities/:id", [authenticateRoute], Activity.delete);

  // Create a new Activity
  router.delete("/activities/", [authenticateRoute], Activity.deleteAll);

  app.use("/travelapi", router);
};