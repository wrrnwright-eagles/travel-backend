module.exports = (sequelize, Sequelize) => {
    const ItineraryParticipants = sequelize.define("itineraryParticipants", {
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      itineraryId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      }
    });
    return ItineraryParticipants;
  };
  