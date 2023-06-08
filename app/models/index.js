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

db.session = require("./session.model.js")(sequelize, Sequelize);
db.user = require("./user.model.js")(sequelize, Sequelize);
db.flight = require("./flight.model.js")(sequelize, Sequelize);
db.itineraryFlight = require("./itineraryFlight.model.js")(sequelize, Sequelize);
db.hotel = require("./hotel.model.js")(sequelize, Sequelize);
db.itineraryHotel = require("./itineraryHotel.model.js")(sequelize, Sequelize);
db.activity = require("./activity.model.js")(sequelize, Sequelize);
db.itineraryActivity = require("./itineraryActivity.model.js")(sequelize, Sequelize);
db.itinerary = require("./itinerary.model.js")(sequelize, Sequelize);
db.location = require("./location.model.js")(sequelize, Sequelize);
db.activityStep = require("./activityStep.model.js")(sequelize, Sequelize); // do we need this one?
db.itineraryStep = require("./itineraryStep.model.js")(sequelize, Sequelize);

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

// foreign key for itinerary
db.user.hasMany(
  db.itinerary,
  { as: "itinerary" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.itinerary.belongsTo(
  db.user,
  { as: "user" },
  { foreignKey: { allowNull: true }, onDelete: "CASCADE" }
);

// foreign key for itineraryFlight
db.itinerary.hasMany(
  db.itineraryFlight,
  { as: "itineraryFlight" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.flight.hasMany(
  db.itineraryFlight,
  { as: "itineraryFlight" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.itineraryFlight.belongsTo(
  db.itinerary,
  { as: "itinerary" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.itineraryFlight.belongsTo(
  db.flight,
  { as: "flight" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

// forign key for itineraryHotel
db.itinerary.hasMany(
  db.itineraryHotel,
  { as: "itineraryHotel" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.hotel.hasMany(
  db.itineraryHotel,
  { as: "itineraryHotel" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.itineraryHotel.belongsTo(
  db.itinerary,
  { as: "itinerary" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.itineraryHotel.belongsTo(
  db.hotel,
  { as: "hotel" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

// forign key for itineraryActivity
db.itinerary.hasMany(
  db.itineraryActivity,
  { as: "itineraryActivity" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.activity.hasMany(
  db.itineraryActivity,
  { as: "itineraryActivity" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.itineraryActivity.belongsTo(
  db.itinerary,
  { as: "itinerary" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.itineraryActivity.belongsTo(
  db.activity,
  { as: "activity" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

module.exports = db;
