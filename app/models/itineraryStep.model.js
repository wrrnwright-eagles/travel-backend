module.exports = (sequelize, Sequelize) => {
  const itineraryStep = sequelize.define("itineraryStep", {
    stepNumber: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  });
  return itineraryStep;
};
