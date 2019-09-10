const Sequelize = require('sequelize');

module.exports = (sequalize, type) => {
    const bookings = sequalize.define('Bookings',{
        "idBooking": {
	        type: Sequelize.INTEGER,
	        autoIncrement: true,
	        primaryKey: true
        },
        "idApartment": Sequelize.INTEGER,
        "idUser": Sequelize.INTEGER,
        "start": Sequelize.DATE,
        "end": Sequelize.DATE,
        "status": Sequelize.ENUM('unconfirmed', 'confirmed', 'canceled')
        }
    );

    return bookings;
};

