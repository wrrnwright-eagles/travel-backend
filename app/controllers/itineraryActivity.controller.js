const db = require("../models");
const ItineraryActivity = db.itineraryActivity;
const Activity = db.activity;
const Op = db.Sequelize.Op;

// Create and Save a new ItineraryActivity
exports.create = (req, res) => {
  // Validate request
  if (req.body.quantity === undefined) {
    const error = new Error("name cannot be empty for itinerary activity!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.itineraryId === undefined) {
    const error = new Error("Itinerary ID cannot be empty for itinerary activity!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.activityId === undefined) {
    const error = new Error(
      "Activity ID cannot be empty for itinerary activity!"
    );
    error.statusCode = 400;
    throw error;
  }
  
    // Create a ItineraryActivity
    const itineraryActivity = {
      quantity: req.body.quantity,
      itineraryId: req.body.itineraryId,
      activityId: req.body.activityId,
    };
    // Save ItineraryActivity in the database
    ItineraryActivity.create(itineraryActivity)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message ||
            "Some error occurred while creating the ItineraryActivity.",
        });
      });
  };

// Retrieve all ItineraryActivities from the database.
exports.findAll = (req, res) => {
  const itineraryActivityId = req.query.itineraryActivityId;
  var condition = itineraryActivityId
    ? {
        id: {
          [Op.like]: `%${itineraryActivityId}%`,
        },
      }
    : null;

  ItineraryActivity.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while retrieving itineraryActivities.",
      });
    });
};

exports.findAllForItinerary = (req, res) => {
  const itineraryId = req.params.itineraryId;
  ItineraryActivity.findAll({
    where: { itineraryId: itineraryId },
    include: [
      {
        model: Activity,
        as: "activity",
        required: true,
      },
    ],
  })
    .then((data) => {
      res.send(data);
    })

    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while retrieving itineraryActivities for a itinerary.",
      });
    });
};

// Find a single ItineraryActivity with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  ItineraryActivity.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Error retrieving ItineraryActivity with id=" + id,
      });
    });
};

// Update a ItineraryActivity by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  ItineraryActivity.update(req.body, {
    where: { id: id },
  })
    .then((number) => {
      if (number == 1) {
        res.send({
          message: "ItineraryActivity was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update ItineraryActivity with id=${id}. Maybe ItineraryActivity was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating ItineraryActivity with id=" + id,
      });
    });
};

// Delete a ItineraryActivity with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  ItineraryActivity.destroy({
    where: { id: id },
  })
    .then((number) => {
      if (number == 1) {
        res.send({
          message: "ItineraryActivity was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete ItineraryActivity with id=${id}. Maybe ItineraryActivity was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Could not delete ItineraryActivity with id=" + id,
      });
    });
};

// Delete all ItineraryActivities from the database.
exports.deleteAll = (req, res) => {
  ItineraryActivity.destroy({
    where: {},
    truncate: false,
  })
    .then((number) => {
      res.send({
        message: `${number} ItineraryActivities were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while removing all ItineraryActivities.",
      });
    });
};