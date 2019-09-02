var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var databaseOptions = require('../database.js');
var db = mysql.createConnection(databaseOptions.databaseOptions);

// Show hotel by ID
router.get('/show/:id', function(req, res, next) {

 db.query("SELECT * FROM Hotels WHERE idHotel=?",
     [
         req.params.id
     ],
     function(error, result){
    res.json({ error: error, result:result[0] });
  });
});

// Show all hotels
router.get('/show/all/:start/:end', function(req, res, next) {

    db.query("SELECT * FROM Hotels ORDER BY idHotel DESC LIMIT ?,?",
        [
            parseInt(req.params.start),
            parseInt(req.params.end)
        ],
        function(error, result){
            res.json({ error: error, result:result });
        });
});

// Add Hotel
router.post('/add', function(req, res, next) {
    res.json({ a: 3 });
});
module.exports = router;
