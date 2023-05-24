const db = require("../models");
const Trips = db.trips;
const Op = db.Sequelize.Op;

// Create and Save a new Trips
exports.create = (req, res) => {
  // Validate request
  if (req.body.name === undefined) {
    const error = new Error("Name cannot be empty for trips!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.start_date === undefined) {
    const error = new Error("start date cannot be empty for trips!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.end_date === undefined) {
    const error = new Error("end date cannot be empty for trips!");
    error.statusCode = 400;
    throw error;
  }

  // Create a trips
  const trips = {
    name: req.body.name,
    start_date: req.body.start_date,
    end_date: req.body.end_date,
  };
  // Save trips in the database
  Trips.create(trips)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the trips.",
      });
    });
};

// Retrieve all trips from the database.
exports.findAll = (req, res) => {
  const tripsId = req.query.tripsId;
  var condition = tripsId
    ? {
        id: {
          [Op.like]: `%${tripsId}%`,
        },
      }
    : null;

  Trips.findAll({ where: condition, order: [["name", "ASC"]] })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving trips.",
      });
    });
};

// Find a single Trip with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  trips.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving Trip with id=" + id,
      });
    });
};

// Update a trip by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Trips.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Trip was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update trip with id=${id}. Maybe Trip was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating Trip with id=" + id,
      });
    });
};

// Delete a Trip with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Trips.destroy({
    where: { id: id },
  })
    .then((number) => {
      if (number == 1) {
        res.send({
          message: "Trip was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Trip with id=${id}. Maybe Trip was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not delete Trip with id=" + id,
      });
    });
};

// Delete all Trips from the database.
exports.deleteAll = (req, res) => {
  Trips.destroy({
    where: {},
    truncate: false,
  })
    .then((number) => {
      res.send({ message: `${number} Trips were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all trips.",
      });
    });
};
