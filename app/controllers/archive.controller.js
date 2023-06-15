const db = require("../models");
const Archive = db.archive;
const Op = db.Sequelize.Op;

// Create and Save a new Archive
exports.create = (req, res) => {
  // Validate request
  if (req.body.name === undefined) {
    const error = new Error("Name cannot be empty for archive!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.startDate === undefined) {
    const error = new Error("startDate cannot be empty for archive!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.endDate === undefined) {
    const error = new Error("endDate cannot be empty for archive!");
    error.statusCode = 400;
    throw error;
  }

  // Create an Archive
  const archive = {
    name: req.body.name,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
  };
  // Save Archive in the database
  Archive.create(archive)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Archive.",
      });
    });
};

// Retrieve all Archives from the database.
exports.findAll = (req, res) => {
  const id = req.query.id;
  var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;
  
  Archive.findAll({ where: condition, order: [["startDate", "ASC"]] })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving archives.",
      });
    });
};

// Find a single Archive with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Archive.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving Archive with id=" + id,
      });
    });
};

// Update an Archive by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Archive.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Archive was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Archive with id=${id}. Maybe Archive was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating Archive with id=" + id,
      });
    });
};

// Delete an Archive with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Archive.destroy({
    where: { id: id },
  })
    .then((number) => {
      if (number == 1) {
        res.send({
          message: "Archive was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Archive with id=${id}. Maybe Archive was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not delete Archive with id=" + id,
      });
    });
};

// Delete all Archives from the database.
exports.deleteAll = (req, res) => {
  Archive.destroy({
    where: {},
    truncate: false,
  })
    .then((number) => {
      res.send({ message: `${number} Archives were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all archives.",
      });
    });
};
