module.exports = (sequelize, Sequelize) => {
    const ItineraryHotel = sequelize.define("itineraryHotel", {
      quantity: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
    });
    return ItineraryHotel;
  };