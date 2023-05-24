const db = require("../models");
const Activity = db.activity;
const ActivityStep = db.activityStep;
const ActivityLocation = db.ActivityLocation;
const Location = db.location;
const Op = db.Sequelize.Op;
// Create and Save a new Activity
exports.create = (req, res) => {
  // Validate request
  if (req.body.name === undefined) {
    const error = new Error("Name cannot be empty for Activity!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.description === undefined) {
    const error = new Error("Description cannot be empty for Activity!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.servings === undefined) {
    const error = new Error("Servings cannot be empty for Activity!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.time === undefined) {
    const error = new Error("Time cannot be empty for Activity!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.isPublished === undefined) {
    const error = new Error("Is Published cannot be empty for Activity!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.userId === undefined) {
    const error = new Error("User Id cannot be empty for Activity!");
    error.statusCode = 400;
    throw error;
  }

  // Create a Activity
  const activity = {
    name: req.body.name,
    description: req.body.description,
    servings: req.body.servings,
    time: req.body.time,
    isPublished: req.body.isPublished ? req.body.isPublished : false,
    userId: req.body.userId,
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

// Find all Activitys for a user
exports.findAllForUser = (req, res) => {
  const userId = req.params.userId;
  Activity.findAll({
    where: { userId: userId },
    include: [
      {
        model: ActivityStep,
        as: "ActivityStep",
        required: false,
        include: [
          {
            model: ActivityLocation,
            as: "ActivityLocation",
            required: false,
            include: [
              {
                model: Location,
                as: "Location",
                required: false,
              },
            ],
          },
        ],
      },
    ],
    order: [
      ["name", "ASC"],
      [ActivityStep, "stepNumber", "ASC"],
    ],
  })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Activities for user with id=${userId}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Error retrieving Activitys for user with id=" + userId,
      });
    });
};

// Find all Published Activitys
exports.findAllPublished = (req, res) => {
  Activity.findAll({
    where: { isPublished: true },
    include: [
      {
        model: ActivityStep,
        as: "activityStep",
        required: false,
        include: [
          {
            model: ActivityLocation,
            as: "ActivityLocation",
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
      },
    ],
    order: [
      ["name", "ASC"],
      [ActivityStep, "stepNumber", "ASC"],
    ],
  })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Published Activities.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving Published Activities.",
      });
    });
};

// Find a single Activity with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Activity.findAll({
    where: { id: id },
    include: [
      {
        model: ActivityStep,
        as: "activityStep",
        required: false,
        include: [
          {
            model: ActivityLocation,
            as: "ActivityLocation",
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
      },
    ],
    order: [[ActivityStep, "stepNumber", "ASC"]],
  })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Activity with id=${id}.`,
        });
      }
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
    .then((number) => {
      if (number == 1) {
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
          err.message || "Some error occurred while removing all Activities.",
      });
    });
};
