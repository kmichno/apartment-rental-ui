var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var databaseOptions = require('../database.js');
var db = mysql.createConnection(databaseOptions.databaseOptions);

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.json({ a: 3 });

 db.query("SELECT 1 FROM DUAL", function(error, result){
    res.json({ error: error, result:result[0] });
  });
});

module.exports = router;
