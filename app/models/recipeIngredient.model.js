module.exports = (sequelize, Sequelize) => {
  const ActivityIngredient = sequelize.define("activityIngredient", {
    quantity: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
  });
  return ActivityIngredient;
};
