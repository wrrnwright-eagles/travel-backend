module.exports = (sequelize, Sequelize) => {
  const Trips = sequelize.define("trips", {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    start_date: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    end_date: {
      type: Sequelize.DATE,
    },
  });
  return Trips;
};
