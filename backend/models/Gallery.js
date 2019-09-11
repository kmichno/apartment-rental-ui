const Sequelize = require('sequelize');

module.exports = (sequelize, type)=> {
    const gallery= sequelize.define('Gallery',{
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
    });

    return gallery;
}