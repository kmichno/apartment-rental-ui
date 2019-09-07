var Sequelize=require('sequelize');
var connectionDatabase = require('../database.js');
const sequelize = new Sequelize(connectionDatabase.databaseParameters);

module.exports = function (sequelize)  {
    return sequelize.define('Apartments',{
        "idApartment": { type: Sequelize.DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        "nameApartment": Sequelize.STRING,
        "description": Sequelize.STRING,
        "city": Sequelize.STRING,
        "street": Sequelize.STRING,
        "code": Sequelize.STRING,
        "numberPeople": Sequelize.INTEGER,
        "priceDay": Sequelize.DECIMAL,
    })

}