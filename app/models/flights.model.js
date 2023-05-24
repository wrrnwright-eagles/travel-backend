module.exports = (sequelize, Sequelize) => {
  const Flights = sequelize.define("flights", {
    trip_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    flight_number: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    departure_location: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    arrival_location: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });
  return Flights;
};
