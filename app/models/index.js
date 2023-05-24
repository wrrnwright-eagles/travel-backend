const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.trips = require("./trips.model.js")(sequelize, Sequelize);
db.flights = require("./flights.model.js")(sequelize, Sequelize);
db.events = require("./events.model.js")(sequelize, Sequelize);
db.hotels = require("./hotels.model.js")(
  sequelize,
  Sequelize
);
db.session = require("./session.model.js")(sequelize, Sequelize);
db.user = require("./user.model.js")(sequelize, Sequelize);

// foreign key for session
db.user.hasMany(
  db.session,
  { as: "session" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.session.belongsTo(
  db.user,
  { as: "user" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

// foreign key for trips
db.user.hasMany(
  db.trips,
  { as: "trips" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.trips.belongsTo(
  db.user,
  { as: "user" },
  { foreignKey: { allowNull: true }, onDelete: "CASCADE" }
);

// foreign key for hotels
db.trips.hasMany(
  db.hotels,
  { as: "hotels" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.hotels.belongsTo(
  db.trips,
  { as: "trips" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

// foreign keys for events
db.events.hasMany(
  db.trips,
  { as: "events" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.events.belongsTo(
  db.trips,
  { as: "trips" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
//foreign keys for flights
db.flights.hasMany(
  db.trips,
  { as: "flights" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.flights.belongsTo(
  db.trips,
  { as: "trips" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
module.exports = db;
