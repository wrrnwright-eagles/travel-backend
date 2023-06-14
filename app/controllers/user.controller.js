const db = require("../models");
const User = db.user;
const Op = db.Sequelize.Op;
const Session = db.session;

// Create and Save a new User
exports.create = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  if (!firstName || !lastName || !email || !password) {
    return res.status(400).send({
      message: 'First name, last name, email and password are required for creating a user'
    });
  }

  try {
    // Check if email already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).send({
        message: 'This email is already in use'
      });
    }

    let salt = await getSalt();
    let hash = await hashPassword(password, salt);

    // Create a User
    const user = {
      id: req.body.id,
      firstName,
      lastName,
      email,
      password: hash,
      salt: salt,
      isAdmin: false 
    };

    // Save User in the database
    const newUser = await User.create(user);
    let userId = newUser.id;

    let expireTime = new Date();
    expireTime.setDate(expireTime.getDate() + 1);

    const session = {
      email: email,
      userId: userId,
      expirationDate: expireTime,
    };
    const newSession = await Session.create(session);
    let sessionId = newSession.id;
    let token = await encrypt(sessionId);

    let userInfo = {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      id: user.id,
      isAdmin: user.isAdmin, // Here is the addition of isAdmin
      token: token,
    };
    return res.send(userInfo);

  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: error.message || 'Some error occurred while creating the User.'
    });
  }
};

exports.subscribeToItinerary = async (req, res) => {
  const { userId, itineraryId } = req.body;
  if (!userId || !itineraryId) {
    return res.status(400).send({
      message: 'userId and itineraryId are required'
    });
  }

  try {
    // Check if the user is already subscribed to the itinerary
    const existingSubscription = await UserItinerary.findOne({ where: { userId, itineraryId } });

    if (existingSubscription) {
      return res.status(400).send({
        message: 'User is already subscribed to this itinerary'
      });
    }

    // If not, create a new subscription
    await UserItinerary.create({ userId, itineraryId });

    return res.send({
      message: 'Successfully subscribed to itinerary'
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message || 'Some error occurred while subscribing to the itinerary'
    });
  }
};


exports.subscribe = (req, res) => {
  // Extract userId and itineraryId from request parameters
  const { userId, itineraryId } = req.params;

  // Perform Sequelize operations to create a new subscription
  Subscription.create({ userId, itineraryId })
    .then(() => res.send({ success: true, message: 'Subscription successful' }))
    .catch((error) => {
      console.error(error);
      res.status(500).send({ success: false, message: 'An error occurred' });
    });
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
  const id = req.query.id;
  var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;

  User.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving users.",
      });
    });
};

// Find a single User with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  User.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find User with id = ${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving User with id = " + id,
      });
    });
};

// Find a single User with an email
exports.findByEmail = (req, res) => {
  const email = req.params.email;

  User.findOne({
    where: {
      email: email,
    },
  })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.send({ email: "not found" });
        /*res.status(404).send({
          message: `Cannot find User with email=${email}.`
        });*/
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving User with email=" + email,
      });
    });
};

// Update a User by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  User.update(req.body, {
    where: { id: id },
  })
    .then((number) => {
      if (number == 1) {
        res.send({
          message: "User was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update User with id = ${id}. Maybe User was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating User with id =" + id,
      });
    });
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  User.destroy({
    where: { id: id },
  })
    .then((number) => {
      if (number == 1) {
        res.send({
          message: "User was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete User with id = ${id}. Maybe User was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not delete User with id = " + id,
      });
    });
};

// Delete all People from the database.
exports.deleteAll = (req, res) => {
  User.destroy({
    where: {},
    truncate: false,
  })
    .then((number) => {
      res.send({ message: `${number} People were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all people.",
      });
    });
};
