module.exports = (sequelize, Sequelize) => {
  const itineraryLocation = sequelize.define("itineraryLocation", {
    quantity: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
  });
  return itineraryLocation;
};
