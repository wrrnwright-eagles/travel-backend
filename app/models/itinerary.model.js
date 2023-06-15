module.exports = (sequelize, Sequelize) => {
  const Itinerary = sequelize.define("itinerary", {
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
    isArchived: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  });
  return Itinerary;
};
