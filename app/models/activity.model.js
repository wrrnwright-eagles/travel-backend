module.exports = (sequelize, Sequelize) => {
  const Activity = sequelize.define("activity", {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    dateTime: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    location: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });
  return Activity;
};