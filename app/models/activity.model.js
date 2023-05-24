module.exports = (sequelize, Sequelize) => {
  const Activity = sequelize.define("activity", {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    servings: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    time: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    isPublished: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
  });
  return Activity;
};
