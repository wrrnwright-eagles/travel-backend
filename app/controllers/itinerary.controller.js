const db = require("../models");
const Itinerary = db.itinerary;
const ItineraryFlight = db.itineraryFlight;
const Flight = db.flight;
const ItineraryHotel = db.itineraryHotel;
const Hotel = db.hotel;
const ItineraryActivity = db.itineraryActivity;
const Activity = db.activity;
const Op = db.Sequelize.Op;
// Create and Save a new Itinerary
exports.create = (req, res) => {
  // Validate request
  if (req.body.name === undefined) {
    const error = new Error("Name cannot be empty for itinerary!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.description === undefined) {
    const error = new Error("Description cannot be empty for itinerary!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.isPublished === undefined) {
    const error = new Error("Is Published cannot be empty for itinerary!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.userId === undefined) {
    const error = new Error("User Id cannot be empty for itinerary!");
    error.statusCode = 400;
    throw error;
  }

// Create a Itinerary
const itinerary = {
  name: req.body.name,
  description: req.body.description,
  isPublished: req.body.isPublished ? req.body.isPublished : false,
  userId: req.body.userId,
};
// Save Itinerary in the database
Itinerary.create(itinerary)
  .then((data) => {
    res.send(data);
  })
  .catch((err) => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the Itinerary.",
    });
  });
};


exports.findArchivedForUser = (req, res) => {
  const userId = req.params.userId;
  Itinerary.findAll({
    where: { 
      userId: userId,
      isArchived: true
    },
    include: [
      {
        model: ItineraryFlight,
        as: "itineraryFlight",
        required: false,
        include: [
          {
            model: Flight,
            as: "flight",
            required: false,
          },
        ],
        model: ItineraryHotel,
        as: "itineraryHotel",
        required: false,
        include: [
          {
            model: Hotel,
            as: "hotel",
            required: false,
          },
        ],
        model: ItineraryActivity,
        as: "itineraryActivity",
        required: false,
        include: [
          {
            model: Activity,
            as: "activity",
            required: false,
          },
        ],
      },
    ],
    order: [
      ["name", "ASC"],
    ],
  })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Archived Itineraries for user with id=${userId}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Error retrieving Archived Itineraries for user with id=" + userId,
      });
    });
};

// Find all Itineraries for a user
exports.findAllForUser = (req, res) => {
  const userId = req.params.userId;
  Itinerary.findAll({
    where: { userId: userId },
    include: [
      {
        model: ItineraryFlight,
        as: "itineraryFlight",
        required: false,
        include: [
          {
            model: Flight,
            as: "flight",
            required: false,
          },
        ],
        model: ItineraryHotel,
        as: "itineraryHotel",
        required: false,
        include: [
          {
            model: Hotel,
            as: "hotel",
            required: false,
          },
        ],
        model: ItineraryActivity,
        as: "itineraryActivity",
        required: false,
        include: [
          {
            model: Activity,
            as: "activity",
            required: false,
          },
        ],
      },
    ],
    order: [
      ["name", "ASC"],
    ],
  })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Itineraries for user with id=${userId}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Error retrieving Itineraries for user with id=" + userId,
      });
    });
};

// Find all Published Itineraries
exports.findAllPublished = (req, res) => {
  Itinerary.findAll({
    where: { isPublished: true },
    include: [
      {
        model: ItineraryFlight,
        as: "itineraryFlight",
        required: false,
        include: [
          {
            model: Flight,
            as: "flight",
            required: false,
          },
        ],
        model: ItineraryHotel,
        as: "itineraryHotel",
        required: false,
        include: [
          {
            model: Hotel,
            as: "hotel",
            required: false,
          },
        ],
        model: ItineraryActivity,
        as: "itineraryActivity",
        required: false,
        include: [
          {
            model: Activity,
            as: "activity",
            required: false,
          },
        ],
      },
    ],
    order: [
      ["name", "ASC"],
    ],
  })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Published Itineraries.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving Published Itineraries.",
      });
    });
};

// Find a single Itinerary with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Itinerary.findAll({
    where: { id: id },
    include: [
      {
        model: ItineraryFlight,
        as: "itineraryFlight",
        required: false,
        include: [
          {
            model: Flight,
            as: "flight",
            required: false,
          },
        ],
        model: ItineraryHotel,
        as: "itineraryHotel",
        required: false,
        include: [
          {
            model: Hotel,
            as: "hotel",
            required: false,
          },
        ],
        model: ItineraryActivity,
        as: "itineraryActivity",
        required: false,
        include: [
          {
            model: Activity,
            as: "activity",
            required: false,
          },
        ],
      },
    ],
    order: [
      ["name", "ASC"],
    ],
  })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Itinerary with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving Itinerary with id=" + id,
      });
    });
};

// Update a Itinerary by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  Itinerary.update(req.body, {
    where: { id: id },
  })
    .then((number) => {
      if (number == 1) {
        res.send({
          message: "Itinerary was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Itinerary with id=${id}. Maybe Itinerary was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating Itinerary with id=" + id,
      });
    });
};

// Delete a Itinerary with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Itinerary.destroy({
    where: { id: id },
  })
    .then((number) => {
      if (number == 1) {
        res.send({
          message: "Itinerary was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Itinerary with id=${id}. Maybe Itinerary was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not delete Itinerary with id=" + id,
      });
    });
};

// Archive a Itinerary by the id in the request
exports.archive = (req, res) => {
  const id = req.params.id;
  Itinerary.update({ isArchived: true }, { 
    where: { id: id } 
  })
  .then(num => {
    if (num == 1) {
      res.send({ message: "Itinerary was archived successfully." });
    } else {
      res.send({
        message: `Cannot archive Itinerary with id=${id}. Maybe Itinerary was not found or req.body is empty!`,
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: err.message || "Error archiving Itinerary with id=" + id,
    });
  });
};

// Delete all Itineraries from the database.
exports.deleteAll = (req, res) => {
  Itinerary.destroy({
    where: {},
    truncate: false,
  })
    .then((number) => {
      res.send({ message: `${number} Itineraries were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Itineraries.",
      });
    });
};

exports.findArchived = (req, res) => {
  Itinerary.findAll({
    where: { isArchived: true },
    include: [
      {
        model: ItineraryFlight,
        as: "itineraryFlight",
        required: false,
        include: [
          {
            model: Flight,
            as: "flight",
            required: false,
          },
        ],
        model: ItineraryHotel,
        as: "itineraryHotel",
        required: false,
        include: [
          {
            model: Hotel,
            as: "hotel",
            required: false,
          },
        ],
        model: ItineraryActivity,
        as: "itineraryActivity",
        required: false,
        include: [
          {
            model: Activity,
            as: "activity",
            required: false,
          },
        ],
      },
    ],
    order: [
      ["name", "ASC"],
    ],
  })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Archived Itineraries.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving Archived Itineraries.",
      });
    });
};
