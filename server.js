require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./app/models");

db.sequelize.sync()
  .then(() => {
    console.log('Database synchronized');
    //app.listen(3000, () => {
      //console.log('Server started on port 3000');
    //});
  })
  .catch((error) => {
    console.error('Error synchronizing database:', error);
  });

var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));
app.options("*", cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the travel itinerary backend." });
});

require("./app/routes/auth.routes.js")(app);
require("./app/routes/user.routes.js")(app);
require("./app/routes/flight.routes.js")(app);
require("./app/routes/itineraryFlight.routes.js")(app);
require("./app/routes/hotel.routes.js")(app);
require("./app/routes/itineraryHotel.routes.js")(app);
require("./app/routes/activity.routes.js")(app);
require("./app/routes/itineraryActivity.routes.js")(app);
require("./app/routes/itineraryStep.routes.js")(app);
require("./app/routes/location.routes.js")(app);
require("./app/routes/itinerary.routes.js")(app);
require("./app/routes/forgotPassword.routes")(app);
require("./app/routes/subscribe.routes")(app);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
// set port, listen for requests
const PORT = process.env.PORT || 3201;
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
}

module.exports = app;
