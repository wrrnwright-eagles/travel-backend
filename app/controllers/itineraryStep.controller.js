const db = require("../models");
const ItineraryStep = db.itineraryStep;
const ItineraryActivity = db.itineraryActivity;
const Activity = db.activity;
const ItineraryFlight = db.itineraryFlight;
const Flight = db.flight;
const ItineraryHotel = db.itineraryHotel;
const Hotel = db.hotel;
const Step = db.step; // Corrected casing
const Op = db.Sequelize.Op;

// Create and Save a new ItineraryStep
exports.create = async (req, res) => {
  // Validate request
  if (!req.body.stepNumber) {
    return res.status(400).send({message: "Step Number cannot be empty for Itinerary Step!"});
  }
  if (!req.body.itineraryId) {
    return res.status(400).send({message: "Itinerary ID cannot be empty for Itinerary Step!"});
  }

  // Create a ItineraryStep
  const itineraryStep = {
    stepNumber: req.body.stepNumber,
    itineraryId: req.body.itineraryId,
  };

  // Save itineraryStep in the database
  try {
    const data = await ItineraryStep.create(itineraryStep);
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the itineraryStep.",
    });
  }
};

// Retrieve all itinerarySteps from the database.
exports.findAll = async (req, res) => {
  const itineraryStepId = req.query.itineraryStepId;
  var condition = itineraryStepId 
    ? { 
      id: {
        [Op.like]: `%${itineraryStepId }%`,
      },
     }
    : null; // Fixed operator

  
    ItineraryStep.findAll({ where: condition })
    .then((data) => {
    res.send(data);
    })
    .catch((err) => {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving itinerarySteps.",
    });
  });
};

// Retrieve all ItinerarySteps for a itinerary from the database.
exports.findAllForItinerary = async (req, res) => {
  const itineraryId = req.params.itineraryId;

  ItineraryStep.findAll({
    where: { itineraryId: itineraryId },
    order: [["stepNumber", "ASC"]],
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

// Retrieve all ItinerarySteps for a itinerary and include the activities
exports.findAllForItineraryWithActivities = (req, res) => {
  const itineraryId = req.params.itineraryId;
    ItineraryStep.findAll({
      where: { itineraryId: itineraryId },
      include: [
        {
          model: ItineraryActivity,
          as: "itineraryActivity",
          
          include: [
            {
              model: Activity,
              as: "activity",
              
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
            "Some error occurred while retrieving itineraryActivities for an itinerary step.",
        });
      });
};

// Retrieve all ItinerarySteps for a itinerary and include the flights
exports.findAllForItineraryWithFlights = (req, res) => {
  const itineraryId = req.params.itineraryId;
    ItineraryStep.findAll({
      where: { itineraryId: itineraryId },
      include: [
        {
          model: ItineraryFlight,
          as: "itineraryFlight",
          
          include: [
            {
              model: Flight,
              as: "flight",
              
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
            "Some error occurred while retrieving itineraryFlights for an itinerary step.",
        });
      });
};

// Retrieve all ItinerarySteps for a itinerary and include the hotels
exports.findAllForItineraryWithHotels = (req, res) => {
  const itineraryId = req.params.itineraryId;
    ItineraryStep.findAll({
      where: { itineraryId: itineraryId },
      include: [
        {
          model: ItineraryHotel,
          as: "itineraryHotel",
          
          include: [
            {
              model: Hotel,
              as: "hotel",
              
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
            "Some error occurred while retrieving itineraryHotels for an itinerary step.",
        });
      });
};

exports.findOne = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await ItineraryStep.findByPk(id);
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error retrieving itineraryStep with id=" + id,
    });
  }
};

exports.update = async (req, res) => {
  const id = req.params.id;
  try {
    const [number] = await ItineraryStep.update(req.body, {
      where: { id: id },
    });
    if (number === 1) {
      res.send({ message: "itineraryStep was updated successfully." });
    } else {
      res.send({
        message: `Cannot update itineraryStep with id=${id}. Maybe itineraryStep was not found or req.body is empty!`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error updating itineraryStep with id=" + id,
    });
  }
};

exports.delete = async (req, res) => {
  const id = req.params.id;
  try {
    const number = await ItineraryStep.destroy({
      where: { id: id },
    });
    if (number === 1) {
      res.send({ message: "itineraryStep was deleted successfully!" });
    } else {
      res.send({
        message: `Cannot delete itineraryStep with id=${id}. Maybe itineraryStep was not found!`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message || "Could not delete itineraryStep with id=" + id,
    });
  }
};

exports.deleteAll = async (req, res) => {
  try {
    const number = await ItineraryStep.destroy({
      where: {},
      truncate: false,
    });
    res.send({
      message: `${number} itinerarySteps were deleted successfully!`,
    });
  } catch (err) {
    res.status(500).send({
      message:
        err.message ||
        "Some error occurred while removing all itinerarySteps.",
    });
  }
};
