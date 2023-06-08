const db = require("../models");
const ItineraryStep = db.itineraryStep;
const Step = db.Step;
const Op = db.Sequelize.Op;
// Create and Save a new ItineraryStep
exports.create = (req, res) => {
  // Validate request
  if (req.body.quantity === undefined) {
    const error = new Error("Quantity cannot be empty for Itinerary Step!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.itineraryId === undefined) {
    const error = new Error("Itinerary ID cannot be empty for Itinerary Step!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.locationId === undefined) {
    const error = new Error(
      "Step ID cannot be empty for Itinerary Step!"
    );
    error.statusCode = 400;
    throw error;
  }

  // Create a ItineraryStep
  const itineraryStep = {
    quantity: req.body.quantity,
    itineraryId: req.body.itineraryId,
    itineraryStepId: req.body.itineraryStepId ? req.body.itineraryStepId : null,
    StepId: req.body.StepId,
  };
  
  // Save itineraryStep in the database
  ItineraryStep.create(itineraryStep)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while creating the itineraryStep.",
      });
    });
};

// Retrieve all itinerarySteps from the database.
exports.findAll = (req, res) => {
  const itineraryStepId = req.query.itineraryStepId;
  var condition = itineraryStepId
    ? {
        id: {
          [Op.like]: `%${itineraryStepId}%`,
        },
      }
    : null;

  ItineraryStep.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while retrieving itinerarySteps.",
      });
    });
};

exports.findAllForItinerary = (req, res) => {
  const itineraryId = req.params.itineraryId;
  ItineraryStep.findAll({
    where: { itineraryId: itineraryId },
    include: [
      {
        model: Step,
        as: "Step",
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
          "Some error occurred while retrieving itinerarySteps for a itinerary.",
      });
    });
};

// Find all itinerarySteps for a itinerary step and include the Steps
exports.findAllForItineraryStepWithSteps = (req, res) => {
  const itineraryStepId = req.params.itineraryStepId;
  ItineraryStep.findAll({
    where: { itineraryStepId: itineraryStepId },
    include: [
      {
        model: Step,
        as: "Step",
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
          "Some error occurred while retrieving itinerarySteps for a itinerary step.",
      });
    });
};

// Find a single itineraryStep with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  ItineraryStep.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Error retrieving itineraryStep with id=" + id,
      });
    });
};

// Update a itineraryStep by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  ItineraryStep.update(req.body, {
    where: { id: id },
  })
    .then((number) => {
      if (number == 1) {
        res.send({
          message: "itineraryStep was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update itineraryStep with id=${id}. Maybe itineraryStep was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating itineraryStep with id=" + id,
      });
    });
};

// Delete an itineraryStep with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  ItineraryStep.destroy({
    where: { id: id },
  })
    .then((number) => {
      if (number == 1) {
        res.send({
          message: "itineraryStep was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete itineraryStep with id=${id}. Maybe itineraryStep was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Could not delete itineraryStep with id=" + id,
      });
    });
};

// Delete all itinerarySteps from the database.
exports.deleteAll = (req, res) => {
  ItineraryStep.destroy({
    where: {},
    truncate: false,
  })
    .then((number) => {
      res.send({
        message: `${number} itinerarySteps were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while removing all itinerarySteps.",
      });
    });
};
