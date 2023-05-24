module.exports = (sequelize, Sequelize) => {
  const Events = sequelize.define("events", {
    trip_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    location: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    trip_date: {
      type: Sequelize.DATE,
      allowNull: false,
    },
  });
  return Events;
};
