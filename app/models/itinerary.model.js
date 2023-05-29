module.exports = (sequelize, Sequelize) => {
    const Itinerary = sequelize.define("intinerary", {
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      isPublished: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
    });
    return Itinerary;
  };