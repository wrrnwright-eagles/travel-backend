const db = require("../models");
const Activity = db.activity;
const ItineraryLocation = db.itineraryLocation;
const Location = db.location;
const Op = db.Sequelize.Op;

// Create and Save a new Activity
exports.create = (req, res) => {
  // Validate request
  if (req.body.activityNumber === undefined) {
    const error = new Error("Activity number cannot be empty for itinerary activity!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.description === undefined) {
    const error = new Error("Description cannot be empty for itinerary activity!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.itineraryId === undefined) {
    const error = new Error("Itinerary ID cannot be empty for itinerary activity!");
    error.statusCode = 400;
    throw error;
  }

  // Create an Activity
  const activity = {
    activityNumber: req.body.activityNumber,
    description: req.body.description,
    itineraryId: req.body.itineraryId,
  };
  Activity.create(activity)
  .then((data) => {
    res.send(data);
  })
  .catch((err) => {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the Activity.",
    });
  });
};
// Retrieve all activitys from the database.
exports.findAll = (req, res) => {
  const activityId = req.query.activityId;
  var condition = activityId
    ? {
        id: {
          [Op.like]: `%${activityId}%`,
        },
      }
    : null;

    activity.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving activity.",
      });
    });
};

// Retrieve all activitys for a Itinerary from the database.
exports.findAllForItinerary = (req, res) => {
  const ItineraryId = req.params.ItineraryId;

  activity.findAll({
    where: { ItineraryId: ItineraryId },
    order: [["stepNumber", "ASC"]],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while retrieving activitys for a Itinerary.",
      });
    });
};

// Find all activitys for a Itinerary and include the locations
exports.findAllForItineraryWithLocations = (req, res) => {
  const ItineraryId = req.params.ItineraryId;
  activity.findAll({
    where: { ItineraryId: ItineraryId },
    include: [
      {
        model: ItineraryLocation,
        as: "ItineraryLocation",
        required: false,
        include: [
          {
            model: Location,
            as: "location",
            required: false,
          },
        ],
      },
    ],
    order: [["stepNumber", "ASC"]],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while retrieving ItineraryLocations for a Itinerary step.",
      });
    });
};

// Find a single activity with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  activity.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find activity with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving activity with id=" + id,
      });
    });
};
// Update a activity by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  activity.update(req.body, {
    where: { id: id },
  })
    .then((number) => {
      if (number == 1) {
        res.send({
          message: "activity was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update activity with id=${id}. Maybe activity was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating activity with id=" + id,
      });
    });
};
// Delete a activity with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  activity.destroy({
    where: { id: id },
  })
    .then((number) => {
      if (number == 1) {
        res.send({
          message: "activity was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete activity with id=${id}. Maybe activity was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not delete activity with id=" + id,
      });
    });
};
// Delete all activity from the database.
exports.deleteAll = (req, res) => {
  Activity.destroy({
    where: {},
    truncate: false,
  })
    .then((number) => {
      res.send({ message: `${number} activities were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all activities.",
      });
    });
};
