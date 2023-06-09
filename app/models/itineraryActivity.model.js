module.exports = (sequelize, Sequelize) => {
    const ItineraryActivity = sequelize.define("itineraryActivity", {
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
    });
    return ItineraryActivity;
  };