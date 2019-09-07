var express = require('express');
var router = express.Router();
var Sequelize=require('sequelize');
var connectionDatabase = require('../database.js');
const sequelize = new Sequelize(connectionDatabase.databaseParameters);
var ApartmentsModel = require('../models/Apartments.js');

// Show all hotels
router.get('/show/all', function(req, res) {
    ApartmentsModel (sequelize).findAll({ order: [['idApartment', 'DESC']] }).
    then(function(Apartments) {
        res.status(200).json(Apartments);
    }, function(error) {
        res.status(500).send(error);
    });
});

// Show all hotels - limit results
router.get('/show/all/:start/:end', function(req, res) {
    ApartmentsModel (sequelize).findAll({ offset: parseInt(req.params.start), limit: parseInt(req.params.end), order: [['idApartment', 'DESC']] }).
    then(function(Apartments) {
        res.status(200).json(Apartments);
    }, function(error) {
        res.status(500).send(error);
    });
});

// Add Hotel
router.post('/add', function(req, res) {
    //console.log("Get parametets:"+req.body);
    var insertApartaments = {
        "nameApartment": req.body.name,
        "description": req.body.description,
        "city": req.body.city,
        "street": req.body.street,
        "code": req.body.code,
        "numberPeople": req.body.people,
        "priceDay": req.body.price
    }
    ApartmentsModel (sequelize).create(insertApartaments).
    then(function(Apartments) {
        res.status(200).json({ result: "ok"});
    }, function(error) {
        res.status(500).send({ result: "error"});
    });
});

// Show hotel by ID
router.get('/show/:id', function(req, res) {
    ApartmentsModel (sequelize).findAll({where: {idApartment: req.params.id},}).
    then(function(Apartments) {
        res.status(200).json(Apartments[0]);
    }, function(error) {
        res.status(500).send(error);
    });
});

module.exports = router;