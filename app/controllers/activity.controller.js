const db = require("../models");
const Activity = db.activity;
const Op = db.Sequelize.Op;

// Create and Save a new Activity
exports.create = (req, res) => {
  // Validate request
  if (req.body.dateTime === undefined) {
    const error = new Error("dateTime cannot be empty for activity!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.location === undefined) {
    const error = new Error("location cannot be empty for activity!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.description === undefined) {
    const error = new Error("description cannot be empty for activity!");
    error.statusCode = 400;
    throw error;
  }

  // Create a Activity
  const activity = {
    dateTime: req.body.dateTime,
    location: req.body.location,
    description: req.body.description,
  };
  // Save Activity in the database
  Activity.create(activity)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Activity.",
      });
    });
};

// Retrieve all Activities from the database.
exports.findAll = (req, res) => {
  const activityId = req.query.activityId;
  var condition = activityId
    ? {
        id: {
          [Op.like]: `%${activityId}%`,
        },
      }
    : null;

  Activity.findAll({ where: condition, order: [["dateTime", "ASC"]] })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving activities.",
      });
    });
};

// Find a single Activity with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Activity.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving Activity with id=" + id,
      });
    });
};

// Update a Activity by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Activity.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Activity was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Activity with id=${id}. Maybe Activity was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating Activity with id=" + id,
      });
    });
};

// Delete a Activity with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Activity.destroy({
    where: { id: id },
  })
    .then((number) => {
      if (number == 1) {
        res.send({
          message: "Activity was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Activity with id=${id}. Maybe Activity was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not delete Activity with id=" + id,
      });
    });
};

// Delete all Activities from the database.
exports.deleteAll = (req, res) => {
  Activity.destroy({
    where: {},
    truncate: false,
  })
    .then((number) => {
      res.send({ message: `${number} Activities were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all activities.",
      });
    });
};