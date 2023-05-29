module.exports = (app) => {
    const Flight = require("../controllers/flight.controller.js");
    var router = require("express").Router();
    const { authenticateRoute } = require("../authentication/authentication");
  
    // Create a new Flight
    router.post("/flights/", [authenticateRoute], Flight.create);
  
    // Retrieve all Ingredient
    router.get("/flights/", Flight.findAll);
  
    // Retrieve a single Ingredient with ingredientId
    router.get("/flights/:id", Flight.findOne);
  
    // Update an Ingredient with ingredientId
    router.put("/flights/:id", [authenticateRoute], Flight.update);
  
    // Delete an Ingredient with ingredientId
    router.delete("/flights/:id", [authenticateRoute], Flight.delete);
  
    // Create a new Ingredient
    router.delete("/flights/", [authenticateRoute], Flight.deleteAll);
  
    app.use("/travelapi", router);
  };