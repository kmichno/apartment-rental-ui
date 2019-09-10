var Sequelize=require('sequelize');
var connectionDatabase = require('../database.js');
const sequelize = new Sequelize(connectionDatabase.databaseParameters);

module.exports = function (sequelize)  {
    return sequelize.define('Gallery',{
        "idGallery": {
            type: Sequelize.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        "idApartment": Sequelize.INTEGER,
        "default": Sequelize.INTEGER,
        "fileGallery": Sequelize.STRING
    }, {
        freezeTableName: true
    })
}