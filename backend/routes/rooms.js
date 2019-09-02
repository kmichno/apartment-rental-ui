var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var databaseOptions = require('../database.js');
var db = mysql.createConnection(databaseOptions.databaseOptions);

// Show room by ID
router.get('/show/:id', function(req, res, next) {

 db.query("SELECT * FROM Rooms WHERE idRoom=?",
     [
         req.params.id
     ],
     function(error, result){
    res.json({ error: error, result:result[0] });
  });
});

module.exports = router;
