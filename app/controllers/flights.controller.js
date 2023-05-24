const db = require("../models");
const Trips = db.trips;
const Flights = db.flights;
const Hotels = db.hotels;
const Events = db.events;
const Op = db.Sequelize.Op;
// Create and Save a new Flights
exports.create = (req, res) => {
  // Validate request
  if (req.body.trip_id === undefined) {
    const error = new Error("trip identification cannot be empty for flight!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.flight_number === undefined) {
    const error = new Error("flight number cannot be empty for flight!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.departure_location === undefined) {
    const error = new Error("Departure location cannot be empty for flight!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.arrival_location === undefined) {
    const error = new Error("Arrival location cannot be empty for flight !");
    error.statusCode = 400;
    throw error;
  } 
  // Create a flight
  const flights = {
    trip_id: req.body.trip_id,
    flight_number: req.body.flight_number,
    departure_location: req.body.departure_location,
    arrival_location: req.body.arrival_location,
  };
  // Save flight in the database
  Flights.create(flights)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the flight.",
      });
    });
};
// Retrieve all flights from the database.
exports.findAll = (req, res) => {
  const flightsId = req.query.flightsId;
  var condition = flightsId
    ? {
        id: {
          [Op.like]: `%${flightsId}%`,
        },
      }
    : null;

  Flights.findAll({ where: condition, order: [["flight_number", "ASC"]] })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving flights.",
      });
    });
};

// Find a single Flight with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Flights.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving Flight with id=" + id,
      });
    });
};

// Update a Flight by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Flights.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Flight was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Flight with id=${id}. Maybe Flight was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating Flight with id=" + id,
      });
    });
};
// Delete a Flight with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Flights.destroy({
    where: { id: id },
  })
    .then((number) => {
      if (number == 1) {
        res.send({
          message: "Flight was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Flight with id=${id}. Maybe Flight was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not delete Flight with id=" + id,
      });
    });
};
// Delete all Flights from the database.
exports.deleteAll = (req, res) => {
  Flights.destroy({
    where: {},
    truncate: false,
  })
    .then((number) => {
      res.send({ message: `${number} Flights were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Flights.",
      });
    });
};
