module.exports = (sequelize, Sequelize) => {
    const Hotel = sequelize.define("hotel", {
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