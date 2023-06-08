module.exports = (sequelize, Sequelize) => {
  const ActivityStep = sequelize.define("activityStep", {
    stepNumber: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    instruction: {
      type: Sequelize.STRING(5000),
      allowNull: false,
    },
  });
  return ActivityStep;
};

// do we need this model at all?
