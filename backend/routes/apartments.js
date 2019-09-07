var express = require('express');
var router = express.Router();
var Sequelize=require('sequelize');
var connectionDatabase = require('../database.js');
const sequelize = new Sequelize(connectionDatabase.databaseParameters);
var db = require('../models/Apartments.js');

// Show hotel by ID
router.get('/show/:id', function(req, res, next) {
    // TODO
});

// Show all hotels
router.get('/show/all', function(req, res, next) {
    db(sequelize).findAll().
    then(function(Apartments) {
        res.status(200).json(Apartments);
    }, function(error) {
        res.status(500).send(error);
    });
});

// Add Hotel
router.post('/add', function(req, res, next) {
    // TODO
});

module.exports = router;