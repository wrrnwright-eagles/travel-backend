const db = require("../models");
const ItineraryParticipants = db.itineraryParticipants;
const Op = db.Sequelize.Op;

// Create and Save a new ItineraryParticipants
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Participant Name can not be empty!"
    });
    return;
  }
  const itineraryParticipants = {
    name: req.body.name,
    itineraryId: req.body.itineraryId
  };

  // Save ItineraryParticipants in the database
  ItineraryParticipants.create(itineraryParticipants)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the ItineraryParticipants."
      });
    });
};

// Retrieve all ItineraryParticipants from the database.
exports.findAll = (req, res) => {
  ItineraryParticipants.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving itineraryParticipants."
      });
    });
};

// Update a ItineraryParticipants by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  ItineraryParticipants.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "ItineraryParticipants was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update ItineraryParticipants with id=${id}. Maybe ItineraryParticipants was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating ItineraryParticipants with id=" + id
      });
    });
};

// Delete a ItineraryParticipants with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  ItineraryParticipants.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "ItineraryParticipants was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete ItineraryParticipants with id=${id}. Maybe ItineraryParticipants was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete ItineraryParticipants with id=" + id
      });
    });
};
// Retrieve all ItineraryParticipants for a specific Itinerary
exports.findAllForItinerary = (req, res) => {
    const itineraryId = req.params.itineraryId;
  
    console.log('Fetching itinerary participants for itineraryId:', itineraryId);
  
    ItineraryParticipants.findAll({ where: { itineraryId: itineraryId } })
      .then(data => {
        console.log('Data:', data);
        res.send(data);
      })
      .catch(err => {
        console.error('Error fetching itinerary participants:', err);
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving itinerary participants."
        });
      });
  };
  
  

// Delete all ItineraryParticipants from the database.
exports.deleteAll = (req, res) => {
  ItineraryParticipants.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} ItineraryParticipants were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all itineraryParticipants."
      });
    });
};
