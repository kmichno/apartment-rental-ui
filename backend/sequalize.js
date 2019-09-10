const Sequelize = require('sequelize');
var connectionDatabase = require('./database.js');
const ApartmentsModel = require('./models/Apartments.js');
const BookingsModel = require('./models/Bookings.js');

const sequelize = new Sequelize(connectionDatabase.databaseParameters);

const Apartments = ApartmentsModel(sequelize, Sequelize);
const Bookings = BookingsModel(sequelize,Sequelize);

Bookings.belongsTo(Apartments, { as:'apartment', foreignKey: 'idApartment', allowNull:true});
Apartments.hasOne(Bookings, {foreignKey: 'idApartment', allowNull:true});

module.exports = { Apartments ,Bookings};