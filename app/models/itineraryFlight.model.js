module.exports = (sequelize, Sequelize) => {
    const ItineraryFlight = sequelize.define("itineraryFlight", {
      quantity: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
    });
    return ItineraryFlight;
  };
  