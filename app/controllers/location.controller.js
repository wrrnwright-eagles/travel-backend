const db = require("../models");
const Location = db.location;
const Op = db.Sequelize.Op;

// Create and Save a new Location
exports.create = (req, res) => {
  // Validate request
  if (req.body.name === undefined) {
    const error = new Error("Name cannot be empty for Location!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.unit === undefined) {
    const error = new Error("Unit cannot be empty for Location!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.pricePerUnit === undefined) {
    const error = new Error("Price per unit cannot be empty for Location!");
    error.statusCode = 400;
    throw error;
  }

  // Create a Location
  const Location = {
    name: req.body.name,
    unit: req.body.unit,
    pricePerUnit: req.body.pricePerUnit,
  };
  // Save Location in the database
  Location.create(location)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Location.",
      });
    });
};

// Retrieve all Locations from the database.
exports.findAll = (req, res) => {
  const locationId = req.query.locationId;
  var condition = locationId
    ? {
        id: {
          [Op.like]: `%${locationId}%`,
        },
      }
    : null;

  Location.findAll({ where: condition, order: [["name", "ASC"]] })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Locations.",
      });
    });
};

// Find a single Location with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Location.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving Location with id=" + id,
      });
    });
};

// Update a Location by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Location.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Location was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Location with id=${id}. Maybe Location was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating Location with id=" + id,
      });
    });
};

// Delete a Location with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Location.destroy({
    where: { id: id },
  })
    .then((number) => {
      if (number == 1) {
        res.send({
          message: "Location was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Location with id=${id}. Maybe Location was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not delete Location with id=" + id,
      });
    });
};

// Delete all Locations from the database.
exports.deleteAll = (req, res) => {
  Location.destroy({
    where: {},
    truncate: false,
  })
    .then((number) => {
      res.send({ message: `${number} Locations were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Locations.",
      });
    });
};
