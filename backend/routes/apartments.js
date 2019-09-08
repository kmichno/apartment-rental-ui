var express = require('express');
var router = express.Router();
var multer = require('multer');
var Sequelize=require('sequelize');
var connectionDatabase = require('../database.js');
const sequelize = new Sequelize(connectionDatabase.databaseParameters);
var ApartmentsModel = require('../models/Apartments.js');
var GalleryModel = require('../models/Gallery.js');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function(req, file, cb) {
        //console.log(file);
        var uploadedFileName = Date.now() + '_' + file.originalname;
        cb(null, uploadedFileName)
    }
})

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

// Upload photo
router.post('/upload-photo', function(req, res) {
    const upload = multer({ storage }).single('image')
    upload(req, res, function(err) {
        if (err) {
            res.status(400).json({ result: "error" });
        }
        //console.log(req.file.filename);

        var insertGallery = {
            "idApartment": req.body.id,
            "fileGallery": req.file.filename
        }
        GalleryModel (sequelize).create(insertGallery).
        then(function(Gallery) {
            res.status(200).json({ result: "ok"});
        }, function(error) {
            res.status(500).send({ result: "error"});
        });
    })
});

module.exports = router;