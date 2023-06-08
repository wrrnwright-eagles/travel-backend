module.exports = (sequelize, Sequelize) => {
    const Hotel = sequelize.define("hotel", {
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      checkInDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      checkOutDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      location: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
    return Hotel;
  };