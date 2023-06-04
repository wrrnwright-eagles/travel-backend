const db = require("../models");
const User = db.user;
const Op = db.Sequelize.Op;

// Handle forgot password request
exports.forgotPassword = async (req, res) => {
    console.log('forgotPassword method executed');
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

    // Generate and send the reset link to the user's email
    // Implement your logic here to generate the reset link and send it to the user's email

    // Send a success response
    return res.status(200).json({ message: "Reset link sent to your email!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed to send reset link." });
  }
};
