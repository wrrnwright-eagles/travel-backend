const db = require("../models");
const User = db.user;
const Op = db.Sequelize.Op;

// Handle subscribe request
exports.subscribe = async (req, res) => {
    console.log('subscribe function executed');
  const { email } = req.body;
  try {
    // Find the user with the provided email
    const user = await User.findOne({
      where: {
        email: email,
      },
    });

    // If user not found, send an error response
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    // Send a success response
    return res.status(200).json({ message: "User Subscribed Successfully!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed to subscribe user." });
  }
};
