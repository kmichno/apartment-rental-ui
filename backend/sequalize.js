const Sequelize = require('sequelize');
var connectionDatabase = require('./database.js');
const ApartmentsModel = require('./models/Apartments.js');
const BookingsModel = require('./models/Bookings.js');
const GalleryModel = require('./models/Gallery.js');

const sequelize = new Sequelize(connectionDatabase.databaseParameters);

const Apartments = ApartmentsModel(sequelize, Sequelize);
const Bookings = BookingsModel(sequelize,Sequelize);
const Gallery = GalleryModel(sequelize,Sequelize);

Bookings.belongsTo(Apartments, { as:'apartment', foreignKey: 'idApartment', allowNull:true});
Apartments.hasMany(Bookings, {foreignKey: 'idApartment', allowNull:true});

Gallery.belongsTo(Apartments, { as:'apartment', foreignKey: 'idApartment', allowNull:true});
Apartments.hasOne(Gallery, {foreignKey: 'idApartment', allowNull:true});

module.exports = { Apartments ,Bookings,Gallery};