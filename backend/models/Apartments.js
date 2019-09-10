const Sequelize = require('sequelize');

module.exports = (sequelize, type) =>  {
    const apartments = sequelize.define('Apartments', {
            "idApartment": {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
            "nameApartment": Sequelize.STRING,
            "description": Sequelize.STRING,
            "city": Sequelize.STRING,
            "street": Sequelize.STRING,
            "code": Sequelize.STRING,
            "numberPeople": Sequelize.INTEGER,
            "priceDay": Sequelize.DECIMAL,
        }
    );

    return apartments;
}