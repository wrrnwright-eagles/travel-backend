const db = require("../models");
const ItineraryHotel = db.itineraryHotel;
const Hotel = db.Hotel;
const Op = db.Sequelize.Op;
// Create and Save a new ItineraryHotel
exports.create = (req, res) => {
  // Validate request
  if (req.body.quantity === undefined) {
    const error = new Error("Name cannot be empty for itinerary hotel!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.itineraryId === undefined) {
    const error = new Error("Itinerary ID cannot be empty for itinerary hotel!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.hotelId === undefined) {
    const error = new Error(
      "Hotel ID cannot be empty for itinerary hotel!"
    );
    error.statusCode = 400;
    throw error;
  }

  // Create a ItineraryHotel
  const itineraryHotel = {
    quantity: req.body.quantity,
    itineraryId: req.body.itineraryId,
    hotelId: req.body.hotelId,
  };
  // Save ItineraryHotel in the database
  ItineraryHotel.create(itineraryHotel)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while creating the ItineraryHotel.",
      });
    });
};

// Retrieve all ItineraryHotels from the database.
exports.findAll = (req, res) => {
    const itineraryHotelId = req.query.itineraryHotelId;
    var condition = itineraryHotelId
      ? {
          id: {
            [Op.like]: `%${itineraryHotelId}%`,
          },
        }
      : null;
  
    ItineraryHotel.findAll({ where: condition })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message ||
            "Some error occurred while retrieving itineraryHotels.",
        });
      });
};

exports.findAllForItinerary = (req, res) => {
    const itineraryId = req.params.itineraryId;
    ItineraryHotel.findAll({
      where: { itineraryId: itineraryId },
      include: [
        {
          model: Hotel,
          as: "hotel",
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
            "Some error occurred while retrieving itineraryHotels for a itinerary.",
        });
      });
};

// Find a single ItineraryHotel with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    ItineraryHotel.findByPk(id)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Error retrieving ItineraryHotel with id=" + id,
        });
      });
};

// Update a ItineraryHotel by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
  
    ItineraryHotel.update(req.body, {
      where: { id: id },
    })
      .then((number) => {
        if (number == 1) {
          res.send({
            message: "ItineraryHotel was updated successfully.",
          });
        } else {
          res.send({
            message: `Cannot update ItineraryHotel with id=${id}. Maybe ItineraryHotel was not found or req.body is empty!`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Error updating ItineraryHotel with id=" + id,
        });
      });
};

// Delete a ItineraryHotel with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    ItineraryHotel.destroy({
      where: { id: id },
    })
      .then((number) => {
        if (number == 1) {
          res.send({
            message: "ItineraryHotel was deleted successfully!",
          });
        } else {
          res.send({
            message: `Cannot delete ItineraryHotel with id=${id}. Maybe ItineraryHotel was not found!`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Could not delete ItineraryHotel with id=" + id,
        });
      });
};
  
// Delete all ItineraryHotels from the database.
exports.deleteAll = (req, res) => {
    ItineraryHotel.destroy({
        where: {},
        truncate: false,
    })
        .then((number) => {
        res.send({
            message: `${number} ItineraryHotels were deleted successfully!`,
        });
        })
        .catch((err) => {
        res.status(500).send({
            message:
            err.message ||
            "Some error occurred while removing all itineraryHotels.",
        });
        });
    };