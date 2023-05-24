module.exports = (sequelize, Sequelize) => {
  const Hotels = sequelize.define("hotels", {
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
    check_in_date: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    check_out_date: {
      type: Sequelize.DATE,
      allowNull: false,
    },
  });
  return Hotels;
};
