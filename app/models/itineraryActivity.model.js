module.exports = (sequelize, Sequelize) => {
    const ItineraryActivity = sequelize.define("itineraryActivity", {
      quantity: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
    });
    return ItineraryActivity;
  };