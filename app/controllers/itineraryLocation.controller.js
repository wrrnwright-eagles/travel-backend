const db = require("../models");
const ActivityLocation = db.activityLocation;
const Location = db.Location;
const Op = db.Sequelize.Op;
// Create and Save a new ActivityLocation
exports.create = (req, res) => {
  // Validate request
  if (req.body.quantity === undefined) {
    const error = new Error("Quantity cannot be empty for Activity Location!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.activityId === undefined) {
    const error = new Error("Activity ID cannot be empty for Activity Location!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.locationId === undefined) {
    const error = new Error(
      "Location ID cannot be empty for Activity Location!"
    );
    error.statusCode = 400;
    throw error;
  }

  // Create a ActivityLocation
  const activityLocation = {
    quantity: req.body.quantity,
    activityId: req.body.activityId,
    activityStepId: req.body.activityStepId ? req.body.activityStepId : null,
    LocationId: req.body.LocationId,
  };
  
  // Save activityLocation in the database
  ActivityLocation.create(activityLocation)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while creating the activityLocation.",
      });
    });
};

// Retrieve all activityLocations from the database.
exports.findAll = (req, res) => {
  const activityLocationId = req.query.activityLocationId;
  var condition = activityLocationId
    ? {
        id: {
          [Op.like]: `%${activityLocationId}%`,
        },
      }
    : null;

  ActivityLocation.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while retrieving activityLocations.",
      });
    });
};

exports.findAllForActivity = (req, res) => {
  const activityId = req.params.activityId;
  ActivityLocation.findAll({
    where: { activityId: activityId },
    include: [
      {
        model: Location,
        as: "Location",
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
          "Some error occurred while retrieving activityLocations for a activity.",
      });
    });
};

// Find all activityLocations for a activity step and include the Locations
exports.findAllForActivityStepWithLocations = (req, res) => {
  const activityStepId = req.params.activityStepId;
  ActivityLocation.findAll({
    where: { activityStepId: activityStepId },
    include: [
      {
        model: Location,
        as: "Location",
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
          "Some error occurred while retrieving activityLocations for a activity step.",
      });
    });
};

// Find a single activityLocation with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  ActivityLocation.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Error retrieving activityLocation with id=" + id,
      });
    });
};

// Update a activityLocation by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  ActivityLocation.update(req.body, {
    where: { id: id },
  })
    .then((number) => {
      if (number == 1) {
        res.send({
          message: "activityLocation was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update activityLocation with id=${id}. Maybe activityLocation was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating activityLocation with id=" + id,
      });
    });
};

// Delete an activityLocation with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  ActivityLocation.destroy({
    where: { id: id },
  })
    .then((number) => {
      if (number == 1) {
        res.send({
          message: "activityLocation was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete activityLocation with id=${id}. Maybe activityLocation was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Could not delete activityLocation with id=" + id,
      });
    });
};

// Delete all activityLocations from the database.
exports.deleteAll = (req, res) => {
  ActivityLocation.destroy({
    where: {},
    truncate: false,
  })
    .then((number) => {
      res.send({
        message: `${number} activityLocations were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while removing all activityLocations.",
      });
    });
};
