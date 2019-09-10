var Sequelize=require('sequelize');
var connectionDatabase = require('../database.js');
const sequelize = new Sequelize(connectionDatabase.databaseParameters);

module.exports = function (sequelize)  {
    return sequelize.define('Users',{
        "idUser": {
            type: Sequelize.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        "idProvider": Sequelize.STRING,
        "provider": Sequelize.STRING,
        "name": Sequelize.STRING,
        "isAdmin": Sequelize.INTEGER,
        "dateRegistration": Sequelize.DATE,
        "dateLastLogin": Sequelize.DATE
    })
}