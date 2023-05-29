module.exports = (sequelize, Sequelize) => {
    const ItineraryHotel = sequelize.define("itineraryHotel", {
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
    return ItineraryHotel;
  };