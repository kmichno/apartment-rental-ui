var express = require('express');
var router = express.Router();
var multer = require('multer');
var Sequelize=require('sequelize');
var connectionDatabase = require('../database.js');
const sequelize = new Sequelize(connectionDatabase.databaseParameters);
var ApartmentsModel = require('../models/Apartments.js');
var GalleryModel = require('../models/Gallery.js');

const Gallery = require('../sequalize').Gallery;
const Apartments = require('../sequalize').Apartments;
const Bookings = require('../sequalize').Bookings;

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
    Apartments.findAll({
        include: [{
            model: Gallery,
            where: {
                default:1
                },
            required: false
        }],
        attributes: {
            include:
                [[Sequelize.fn("IFNULL",Sequelize.col("Gallery.fileGallery"),'default.png'),'filePath']]
        },
        order: [['idApartment', 'DESC']]
    }).
    then(function(Gallery) {
        res.status(200).json({result:Gallery});
    }, function(error) {
        console.log(error);
        res.status(500).send({result:"error"});
    });
});

// Show hotels with parameters
router.get('/show/:start/:end/:numberPeople/:city', function(req, res) {
    Apartments.findAll({
        include: [{
            model: Gallery,
            where: {
                default:1
            },
            required: false
        },
            {
                model: Bookings,
                required: false,
                where: {
                    start: {
                        [Sequelize.Op.lt]: new Date(req.params.end)
                    }, // <=
                    end: {
                        [Sequelize.Op.gt]: new Date(req.params.start)
                    }
                }
            }
        ],
        attributes: {
            include:
                [[Sequelize.fn("IFNULL",Sequelize.col("Gallery.fileGallery"),'default.png'),'filePath']]
        },
        order: [['idApartment', 'DESC']],
        where: {
            city: {
                [Sequelize.Op.like]: req.params.city
            },
            numberPeople: {
                [Sequelize.Op.gte]: req.params.numberPeople
            }
        }
    }).
    then(function(Apartments) {
        let apartmentsNotBooked = Apartments.filter(item => item.Bookings.length === 0);
        res.status(200).json({result:apartmentsNotBooked});
    }, function(error) {
        console.log(error);
        res.status(500).send({result:"error"});
    });
});

// Show all hotels - limit results
router.get('/show/all/:start/:end', function(req, res) {
    Apartments.findAll({
        include: [{
            model: Gallery,
            where: {
                default:1
            },
            required: false
        }],
        attributes: {
            include:
                [[Sequelize.fn("IFNULL",Sequelize.col("Gallery.fileGallery"),'default.png'),'filePath']]
            },
         offset: parseInt(req.params.start),
        limit: parseInt(req.params.end),
        order: [['idApartment', 'DESC']]
    }).
    then(function(Gallery) {
        res.status(200).json({result:Gallery});
    }, function(error) {
        console.log(error);
        res.status(500).send({result:"error"});
    });
});

// Add Hotel
router.post('/add', function(req, res) {
    //console.log("Get parametets:"+req.body);
    var insertApartaments = {
        "nameApartment": req.body.nameApartment,
        "description": req.body.description,
        "city": req.body.city,
        "street": req.body.street,
        "code": req.body.code,
        "numberPeople": req.body.numberPeople,
        "priceDay": req.body.priceDay
    }
    ApartmentsModel (sequelize).create(insertApartaments).
    then(function(Apartments) {
        res.status(200).json({ result: Apartments});
    }, function(error) {
        res.status(500).send({ result: "error"});
    });
});

// Show hotel by ID
router.get('/show/:id', function(req, res) {
    Apartments.findAll({
        include: [{
            model: Gallery,
            where: {
                default:1
            },
            required: false
        }],
        attributes: {
            include:
                [[Sequelize.fn("IFNULL",Sequelize.col("Gallery.fileGallery"),'default.png'),'filePath']]
        },
        where: {
            idApartment: req.params.id
        },
        order: [['idApartment', 'DESC']]
    }).
    then(function(Gallery) {
        res.status(200).json({result:Gallery[0]});
    }, function(error) {
        console.log(error);
        res.status(500).send({result:"error"});
    });
});

// Upload photo
router.post('/upload-photo', function(req, res) {
    const upload = multer({ storage }).single('file')
    console.log(req.file)
    console.log(req.body)
    upload(req, res, function(err) {
        if (err) {
            res.status(400).json({ result: "error" });
        }
        //console.log(req.file.filename);

        var insertGallery = {
            "idApartment": req.body.id,
            "fileGallery": req.file.name,
            "default": 0,
        }
        GalleryModel (sequelize).create(insertGallery).
        then(function(Gallery) {
            res.status(200).json({ result: "ok"});
        }, function(error) {
            res.status(500).send({ result: "error"});
        });
    })
});

// Set default image for apartment
router.put('/set/image/:id_gallery/id/:id_apartment', function(req, res) {
    GalleryModel (sequelize).update({
            default: 0
        }, // unset all images for id_apartment
        {
            where: {
                idApartment: req.params.id_apartment
            }}).
        then(function(Gallery) {
                GalleryModel (sequelize).update({
                        default: 1
                    }, //set new default image
                    {
                        where: {
                            idGallery: req.params.id_gallery
                        }}).
                then(function(Gallery2) {
                    res.status(200).json({result: "ok"});
                }, function(error) {
                    res.status(500).send({result: "error"});
                });
        }, function(error) {
            res.status(500).send({result: "ok"});
        });
});

// Edit apartment
router.put('/edit/:id', function(req, res) {
    Apartments.update({
            nameApartment: req.body.nameApartment,
            description: req.body.description,
            city: req.body.city,
            street: req.body.street,
            code: req.body.code,
            numberPeople: req.body.numberPeople,
            priceDay: req.body.priceDay
        },
        {
            where: {
                idApartment: req.params.id  }
        }).
    then(function(Apartments) {
        res.status(200).json({result: "ok"});
    }, function(error) {
        res.status(500).send({result: "ok"});
    });
});

// Delete apartment
router.delete('/delete/:id', function(req, res) {
    Apartments.destroy({
        where: {
            idApartment: req.params.id
        }}).
    then(function(Apartments) {
        res.status(200).json({result: "ok"});
    }, function(error) {
        res.status(500).send({result: "ok"});
    });
});

module.exports = router;