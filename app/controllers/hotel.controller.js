const db = require("../models");
const Hotel = db.hotel;
const Op = db.Sequelize.Op;

// Create and Save a new Hotel
exports.create = (req, res) => {
  // Validate request
  if (req.body.name === undefined) {
    const error = new Error("Name cannot be empty for hotel!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.checkInDate === undefined) {
    const error = new Error("checkInDate cannot be empty for hotel!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.checkOutDate === undefined) {
    const error = new Error("checkOutDate cannot be empty for hotel!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.location === undefined) {
    const error = new Error("location cannot be empty for hotel!");
    error.statusCode = 400;
    throw error;
  }

  // Create a Hotel
  const hotel = {
    name: req.body.name,
    checkInDate: req.body.checkInDate,
    checkOutDate: req.body.checkOutDate,
    location: req.body.location,
  };
  // Save Hotel in the database
  Hotel.create(hotel)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Hotel.",
      });
    });
};

// Retrieve all Hotels from the database.
exports.findAll = (req, res) => {
  const id = req.query.id;
  var condition = id
    ? { id: { [Op.like]: `%${id}%`, } }
    : null;
  
    Hotel.findAll({ where: condition, order: [["checkInDate", "ASC"]] })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving hotels.",
        });
      });
};

// Find a single Hotel with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Hotel.findByPk(id)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Error retrieving Hotel with id=" + id,
        });
      });
};

// Update a Hotel by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
  
    Hotel.update(req.body, {
      where: { id: id },
    })
      .then((num) => {
        if (num == 1) {
          res.send({
            message: "Hotel was updated successfully.",
          });
        } else {
          res.send({
            message: `Cannot update Hotel with id=${id}. Maybe Hotel was not found or req.body is empty!`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Error updating Hotel with id=" + id,
        });
      });
};

// Delete a Hotel with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Hotel.destroy({
      where: { id: id },
    })
      .then((number) => {
        if (number == 1) {
          res.send({
            message: "Hotel was deleted successfully!",
          });
        } else {
          res.send({
            message: `Cannot delete Hotel with id=${id}. Maybe Hotel was not found!`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Could not delete Hotel with id=" + id,
        });
      });
};

// Delete all Hotels from the database.
exports.deleteAll = (req, res) => {
    Hotel.destroy({
      where: {},
      truncate: false,
    })
      .then((number) => {
        res.send({ message: `${number} Hotels were deleted successfully!` });
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all ingredients.",
        });
      });
  };