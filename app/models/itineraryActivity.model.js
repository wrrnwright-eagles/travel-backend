module.exports = (sequelize, Sequelize) => {
    const ItineraryActivity = sequelize.define("itineraryActivity", {
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
    return ItineraryActivity;
  };