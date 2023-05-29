module.exports = (sequelize, Sequelize) => {
    const ItineraryFlight = sequelize.define("itineraryFlight", {
      flightNumber: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
    return ItineraryFlight;
  };
  