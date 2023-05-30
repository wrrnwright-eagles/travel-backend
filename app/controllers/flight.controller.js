const db = require("../models");
const Flight = db.flight;
const Op = db.Sequelize.Op;

// Create and Save a new Flight
exports.create = (req, res) => {
  // Validate request
  if (!req.body.departureLocation) {
    const error = new Error("Departure Location cannot be empty for Flight!");
    error.statusCode = 400;
    throw error;
  } else if (!req.body.departureDateTime) {
    const error = new Error("Departure DateTime cannot be empty for Flight!");
    error.statusCode = 400;
    throw error;
  } else if (!req.body.arrivalLocation) {
    const error = new Error("Arrival Location cannot be empty for Flight!");
    error.statusCode = 400;
    throw error;
  } else if (!req.body.arrivalDateTime) {
    const error = new Error("Arrival DateTime cannot be empty for Flight!");
    error.statusCode = 400;
    throw error;
  }

  // Create a Flight
  const flight = {
    departureLocation: req.body.departureLocation,
    departureDateTime: req.body.departureDateTime,
    arrivalLocation: req.body.arrivalLocation,
    arrivalDateTime: req.body.arrivalDateTime,
  };
  // Save Flight in the database
  Flight.create(flight)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Flight.",
      });
    });
};

// Retrieve all Flights from the database
exports.findAll = (req, res) => {
  const id = req.query.id;
  var condition = id
    ? { id: { [Op.like]: `%${id}%`, } }
    : null;

  Flight.findAll({ where: condition, order: [["id", "ASC"]] })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving flights.",
      });
    });
};

// Find a single Flight with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Flight.findByPk(id)
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

  Flight.update(req.body, {
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

  Flight.destroy({
    where: { id: id },
  })
    .then((number) => {
      if (number == 1) {
                //...
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
          Flight.destroy({
            where: {},
            truncate: false,
          })
            .then((number) => {
              res.send({ message: `${number} Flights were deleted successfully!` });
            })
            .catch((err) => {
              res.status(500).send({
                message:
                  err.message || "Some error occurred while removing all flights.",
              });
            });
        };
        