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

db.location = require("./location.model.js")(sequelize, Sequelize);
db.activity = require("./activity.model.js")(sequelize, Sequelize);
db.activityStep = require("./activityStep.model.js")(sequelize, Sequelize);
db.itineraryLocation = require("./itineraryLocation.model.js")(
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

// foreign key for activity
db.user.hasMany(
  db.activity,
  { as: "activity" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.activity.belongsTo(
  db.user,
  { as: "user" },
  { foreignKey: { allowNull: true }, onDelete: "CASCADE" }
);

// foreign key for activityStep
db.activity.hasMany(
  db.activityStep,
  { as: "activityStep" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.activityStep.belongsTo(
  db.activity,
  { as: "activity" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

// foreign keys for activitylocation
db.activityStep.hasMany(
  db.activityLocation,
  { as: "activityLocation" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.activity.hasMany(
  db.activityLocation,
  { as: "activityLocation" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.location.hasMany(
  db.activityLocation,
  { as: "activityLocation" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.activityLocation.belongsTo(
  db.activityStep,
  { as: "activityStep" },
  { foreignKey: { allowNull: true }, onDelete: "CASCADE" }
);
db.activityLocation.belongsTo(
  db.activity,
  { as: "activity" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.activityLocation.belongsTo(
  db.Location,
  { as: "ocation" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

module.exports = db;
