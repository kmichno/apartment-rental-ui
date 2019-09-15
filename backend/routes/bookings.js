var express = require('express');
var router = express.Router();
var Sequelize=require('sequelize');
var connectionDatabase = require('../database.js');
const sequelize = new Sequelize(connectionDatabase.databaseParameters);
var BookingsModel = require('../models/Bookings.js');

const Bookings = require('../sequalize').Bookings;
const Apartments = require('../sequalize').Apartments;
const Gallery = require('../sequalize').Gallery;
const Users = require('../sequalize').Users;

// Check the availability of the booking of the selected apartment
router.get('/check-status/:id/from/:date_start/to/:date_end', function(req, res) {
    BookingsModel (sequelize).count({
        where: {
            idApartment: {
                [Sequelize.Op.eq]: req.params.id
            },
            start: {
                [Sequelize.Op.lte]: new Date(req.params.date_end)
            }, // <=
            end: {
                [Sequelize.Op.gte]: new Date(req.params.date_start)
            }, //>=
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
        res.status(500).send({result: "ok"});
    });
});

// Add reservation
router.post('/add', function(req, res) {
    console.log(req.body.idApartment);
    var insertBookings = {
        "idApartment": req.body.idApartment,
        "idUser": req.body.idUser,
        "start": "2019-11-06", //req.body.start,
        "end": "2019-11-07", //req.body.end,
        "status": 'unconfirmed'
    }
    BookingsModel (sequelize).create(insertBookings).
    then(function(Bookings) {
        res.status(200).json({ result: "ok"});
    }, function(error) {
        res.status(500).send({ result: "error"});
        //console.log(error);
    });
});

// Show all bookings
router.get('/show/all', function(req, res) {
    Bookings.findAll({
        include: [
            {
                model: Apartments,
                as: 'apartment',
                include:  {
                    model: Gallery,
                    where: {
                        default:1
                    },
                    required: false
                }
            },
 /*           {
                model: Users,
                required: false
            }
 */       ],
        attributes: {
            include:
                [
                    [Sequelize.fn('date_format',Sequelize.col("start"),'%d.%m.%Y'),'startFormat'],
                    [Sequelize.fn('date_format',Sequelize.col("end"),'%d.%m.%Y'),'endFormat'],
                    [Sequelize.literal('DATEDIFF(end,start)+1'), 'rentingDays'],
                ]
        },

        order: [['idBooking', 'DESC']]}).
    then(function(Bookings) {
        res.status(200).json({result:Bookings});
    }, function(error) {
        console.log(error);
        res.status(500).send({result:"error"});
    });
});

// Booking Confirm
router.put('/change/:id/confirm', function(req, res) {
     BookingsModel (sequelize).update({
             status: "confirmed"
         },
        {
            where: {
                idBooking: req.params.id
            }}).
    then(function(Bookings) {
            res.status(200).json({result: "ok"});
    }, function(error) {
        res.status(500).send({result: "error"});
    });
});

// Booking Cancel
router.put('/change/:id/cancel', function(req, res) {
    BookingsModel (sequelize).update({
            status: "canceled"
        },
        {
            where: {
                idBooking: req.params.id  }
        }).
    then(function(Bookings) {
        res.status(200).json({result: "ok"});
    }, function(error) {
        res.status(500).send({result: "ok"});
    });
});

// Booking Delete
router.delete('/change/:id/delete', function(req, res) {
    BookingsModel (sequelize).destroy({
        where: {
            idBooking: req.params.id
        }}).
    then(function(Bookings) {
        res.status(200).json({result: "ok"});
    }, function(error) {
        res.status(500).send({result: "ok"});
    });
});

module.exports = router;