module.exports = (sequelize, Sequelize) => {
  const Location = sequelize.define("location", {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    unit: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    pricePerUnit: {
      type: Sequelize.DECIMAL(10, 2),
    },
  });
  return Location;
};
