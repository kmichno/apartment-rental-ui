const Sequelize = require('sequelize');

module.exports = (sequelize, type) => {
    const users=sequelize.define('Users',{
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
    });
    return users;
}