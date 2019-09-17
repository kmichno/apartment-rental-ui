const Sequelize = require('sequelize');
var connectionDatabase = require('./database.js');
const ApartmentsModel = require('./models/Apartments.js');
const BookingsModel = require('./models/Bookings.js');
const GalleryModel = require('./models/Gallery.js');
const UsersModel = require('./models/Users.js');

const sequelize = new Sequelize(connectionDatabase.databaseParameters);

const Apartments = ApartmentsModel(sequelize, Sequelize);
const Bookings = BookingsModel(sequelize,Sequelize);
const Gallery = GalleryModel(sequelize,Sequelize);
const Users = UsersModel(sequelize,Sequelize);

Bookings.belongsTo(Apartments, { as:'apartment', foreignKey: 'idApartment', allowNull:true});
Apartments.hasMany(Bookings, {foreignKey: 'idApartment', allowNull:true});

Gallery.belongsTo(Apartments, { as:'apartment', foreignKey: 'idApartment', allowNull:true});
Apartments.hasOne(Gallery, {foreignKey: 'idApartment', allowNull:true});

//Users.belongsTo(Bookings, { as:'booking', foreignKey: 'idUser', allowNull:true});
//Bookings.hasOne(Users, {foreignKey: 'idUser', allowNull:true});

Bookings.belongsTo(Users, {foreignKey: 'idUser'});

module.exports = { Apartments ,Bookings,Gallery, Users};