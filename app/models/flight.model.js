module.exports = (sequelize, Sequelize) => {
    const Flight = sequelize.define("flight", {
      departureLocation: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      departureDateTime: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      arrivalLocation: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      arrivalDateTime: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
    return Flight;
  };