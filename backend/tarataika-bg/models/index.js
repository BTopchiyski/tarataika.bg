const dbConfig = require('../config/db.config');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.vehiclesCategories = require('./vehicle-categories.js')(sequelize, Sequelize);
db.makes = require('./makes.js')(sequelize, Sequelize);
db.models = require('./models.js')(sequelize, Sequelize);
db.listings = require('./listings.js')(sequelize, Sequelize);
db.engines = require('./engines.js')(sequelize, Sequelize);
db.gearboxes = require('./gearboxes.js')(sequelize, Sequelize);
db.locations = require('./locations.js')(sequelize, Sequelize);
db.paints = require('./paints.js')(sequelize, Sequelize);
db.eurocategories = require('./eurocategories.js')(sequelize, Sequelize);
db.vehicleExtras = require('./vehicle-extras.js')(sequelize, Sequelize);
db.users = require('./users')(sequelize, Sequelize);
db.pictures = require('./pictures')(sequelize, Sequelize);


db.listings.belongsToMany(db.vehicleExtras, {
  through: 'listings_vehicles_extras',
  as: 'extras',
  foreignKey: 'listing_id'
});

db.vehicleExtras.belongsToMany(db.listings, {
  through: 'listings_vehicles_extras',
  as: 'listings',
  foreignKey: 'extra_id'
});

db.vehiclesCategories.belongsToMany(db.makes, {
  through: 'makes_vehicles_categories',
  as: 'makes',
  foreignKey: 'vehicle_category_id'
});

db.makes.belongsToMany(db.vehiclesCategories, {
  through: 'makes_vehicles_categories',
  as: 'categories',
  foreignKey: 'make_id'
});

db.listings.belongsTo(db.makes, {
  as: 'make',
  foreignKey: 'make_id'
});

db.listings.belongsTo(db.models, {
  as: 'model',
  foreignKey: 'model_id'
});

db.listings.belongsTo(db.engines, {
  as: 'engine',
  foreignKey: 'engine_id'
});

db.listings.belongsTo(db.gearboxes, {
  as: 'gearbox',
  foreignKey: 'gearbox_id'
});

db.listings.belongsTo(db.locations, {
  as: 'location',
  foreignKey: 'location_id'
});

db.listings.belongsTo(db.paints, {
  as: 'paint',
  foreignKey: 'paint_id'
});

db.listings.belongsTo(db.eurocategories, {
  as: 'ecategory',
  foreignKey: 'eurocategory'
});

db.listings.belongsTo(db.vehiclesCategories, {
  as: 'vehicle_category',
  foreignKey: 'vehicle_category_id'
});

db.pictures.belongsTo(db.listings, {
  as: 'listing',
  foreignKey: 'listing_id'
});

module.exports = db;