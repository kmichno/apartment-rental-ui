var Sequelize=require('sequelize');
var connectionDatabase = require('../database.js');
const sequelize = new Sequelize(connectionDatabase.databaseParameters);

module.exports = function (sequelize)  {
    return sequelize.define('Bookings',{
        "idBooking": {
            type: Sequelize.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        "idApartment": Sequelize.INTEGER,
        "idUser": Sequelize.INTEGER,
        "start": Sequelize.DATE,
        "end": Sequelize.DATE,
        "status": Sequelize.ENUM('unconfirmed', 'confirmed', 'canceled')
    })
}