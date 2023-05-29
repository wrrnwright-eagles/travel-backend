module.exports = (app) => {
    const Hotel = require("../controllers/hotel.controller.js");
    var router = require("express").Router();
    const { authenticateRoute } = require("../authentication/authentication");
  
    // Create a new Hotel
    router.post("/hotels/", [authenticateRoute], Hotel.create);
  
    // Retrieve all Hotel
    router.get("/hotels/", Hotel.findAll);
  
    // Retrieve a single Hotel with hotelId
    router.get("/hotels/:id", Hotel.findOne);
  
    // Update an Hotel with hotelId
    router.put("/hotels/:id", [authenticateRoute], Hotel.update);
  
    // Delete an Hotel with hotelId
    router.delete("/hotels/:id", [authenticateRoute], Hotel.delete);
  
    // Create a new Hotel
    router.delete("/hotels/", [authenticateRoute], Hotel.deleteAll);
  
    app.use("/travelapi", router);
  };