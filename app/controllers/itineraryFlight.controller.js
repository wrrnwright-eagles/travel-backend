const db = require("../models");
const ItineraryFlight = db.itineraryFlight;
const Flight = db.flight;
const Op = db.Sequelize.Op;
// Create and Save a new ItineraryFlight
exports.create = (req, res) => {
  // Validate request
  if (req.body.quantity === undefined) {
    const error = new Error("Flight Number cannot be empty for Itinerary Flight!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.itineraryId === undefined) {
    const error = new Error("Itinerary ID cannot be empty for Itinerary Flight!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.flightId === undefined) {
    const error = new Error(
      "Flight ID cannot be empty for Itinerary Flight!"
    );
    error.statusCode = 400;
    throw error;
  }

  // Create a ItineraryFlight
  const itineraryFlight = {
    quantity: req.body.quantity,
    itineraryId: req.body.itineraryId,
    flightId: req.body.flightId,
  };
  // Save ItineraryFlight in the database
  ItineraryFlight.create(itineraryFlight)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while creating the ItineraryFlight.",
      });
    });
};

// Retrieve all ItineraryFlights from the database.
exports.findAll = (req, res) => {
    const itineraryFlightId = req.query.itineraryFlightId;
    var condition = itineraryFlightId
      ? {
          id: {
            [Op.like]: `%${itineraryFlightId}%`,
          },
        }
      : null;
  
    ItineraryFlight.findAll({ where: condition })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message ||
            "Some error occurred while retrieving itineraryFlights.",
        });
      });
  };
  
  exports.findAllForItinerary = (req, res) => {
    const itineraryId = req.params.itineraryId;
    ItineraryFlight.findAll({
      where: { itineraryId: itineraryId },
      include: [
        {
          model: Flight,
          as: "flight",
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
            "Some error occurred while retrieving itineraryFlights for a itinerary.",
        });
      });
  };

  // Find all ItineraryFlights for a itinerary step and include the flights
exports.findAllForItineraryStepWithFlights = (req, res) => {
  const itineraryStepId = req.params.itineraryStepId;
  ItineraryFlight.findAll({
    where: { itineraryStepId: itineraryStepId },
    include: [
      {
        model: Flight,
        as: "flight",
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
          "Some error occurred while retrieving itineraryHotels for a itinerary step.",
      });
    });
};

// Find a single ItineraryFlight with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    ItineraryFlight.findByPk(id)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Error retrieving ItineraryFlight with id=" + id,
        });
      });
  };

// Update a ItineraryFlight by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
  
    ItineraryFlight.update(req.body, {
      where: { id: id },
    })
      .then((number) => {
        if (number == 1) {
          res.send({
            message: "ItineraryFlight was updated successfully.",
          });
        } else {
          res.send({
            message: `Cannot update ItineraryFlight with id=${id}. Maybe ItineraryFlight was not found or req.body is empty!`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Error updating ItineraryFlight with id=" + id,
        });
      });
  };

// Delete a ItineraryFlight with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    ItineraryFlight.destroy({
      where: { id: id },
    })
      .then((number) => {
        if (number == 1) {
          res.send({
            message: "ItineraryFlight was deleted successfully!",
          });
        } else {
          res.send({
            message: `Cannot delete ItineraryFlight with id=${id}. Maybe ItineraryFlight was not found!`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Could not delete ItineraryFlight with id=" + id,
        });
      });
  };
  
  // Delete all ItineraryFlights from the database.
  exports.deleteAll = (req, res) => {
    ItineraryFlight.destroy({
      where: {},
      truncate: false,
    })
      .then((number) => {
        res.send({
          message: `${number} ItineraryFlights were deleted successfully!`,
        });
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message ||
            "Some error occurred while removing all itineraryFlights.",
        });
      });
  };