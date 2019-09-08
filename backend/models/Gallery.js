var Sequelize=require('sequelize');
var connectionDatabase = require('../database.js');
const sequelize = new Sequelize(connectionDatabase.databaseParameters);

module.exports = function (sequelize)  {
    return sequelize.define('Gallery',{
        "idApartment": Sequelize.INTEGER,
        "fileGallery": Sequelize.STRING
    })
}