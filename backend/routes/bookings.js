var express = require('express');
var router = express.Router();
var Sequelize=require('sequelize');
var connectionDatabase = require('../database.js');
const sequelize = new Sequelize(connectionDatabase.databaseParameters);
var BookingsModel = require('../models/Bookings.js');

// Check the availability of the booking of the selected apartment
router.get('/check-status/:id/from/:date_start/to/:date_end', function(req, res) {
    BookingsModel (sequelize).count({where: {
        idApartment: { [Sequelize.Op.eq]: req.params.id  },
        start: { [Sequelize.Op.lte]: new Date(req.params.date_end)  }, // <=
        end: { [Sequelize.Op.gte]: new Date(req.params.date_start)  }, //>=
    }}).
    then(function(Bookings) {
        if (Bookings==1) {
            res.status(200).json({result: "reserved"});
        }
        else if (Bookings==0)
        {
            res.status(200).json({result: "free"});
        }
    }, function(error) {
        res.status(500).send(error);
    });
});

// Add reservation
router.post('/add', function(req, res) {
    var insertBookings = {
        "idApartment": req.body.idApartment,
        "idUser": 1, // TODO change req.body.idUser,
        "start": req.body.start,
        "end": req.body.end,
        "status": 'unconfirmed'
    }
    BookingsModel (sequelize).create(insertBookings).
    then(function(Bookings) {
        res.status(200).json({ result: "ok"});
    }, function(error) {
        console.log("Log"+insertBookings);
        res.status(500).send({ result: "error"});
    });
});

module.exports = router;