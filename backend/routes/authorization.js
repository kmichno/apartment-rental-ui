var express = require('express');
var router = express.Router();
var Sequelize=require('sequelize');
var connectionDatabase = require('../database.js');
const sequelize = new Sequelize(connectionDatabase.databaseParameters);
var UsersModel = require('../models/Users.js');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var connectionFacebook = require('../facebook.js');
const CLIENT_HOME_PAGE_URL = "http://localhost:3000";

passport.use(new FacebookStrategy(connectionFacebook.facebookParameters,

    function (accessToken, refreshToken, profile, cb) {
        //console.log('....', accessToken, refreshToken, profile, cb);
        UsersModel (sequelize).count({
            where: {
                idProvider: { [Sequelize.Op.eq]: profile.id  }
            }}).
        then(function(Users) {
            if (Users==1) {
                console.log("User found in DB");
                UsersModel (sequelize).update({
                        dateLastLogin: new Date()},
                        {
                        where: {
                            idProvider: profile.id  }}).
                then(function(Users) {
                    console.log ("Update last login date");
                }, function(error) {
                    console.log("Error during update last login date");
                });
            }
            else if (Users==0)
            {
                console.log("User not found in DB");
                var insertUsers = {
                    "idProvider": profile.id,
                    "provider": "facebook",
                    "name": profile.displayName,
                    "dateRegistration": new Date()
                }
                UsersModel (sequelize).create(insertUsers).
                then(function(Users) {
                    console.log("Add user to DB");
                }, function(error) {
                    conosle.log("Error during add user to DB");
                });
            }
        }, function(error) {
            console.log("Error");
        });

        return cb(null, {
            user: profile.id,
            name: profile.displayName
        });
    }
));

passport.serializeUser(function(user, done) {
    done(null, user);

});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

// Login user
router.get('/login', passport.authenticate('facebook'));

// Logout user
router.get('/logout', function (req, res) {
        //res.status(200).json({ result: "ok"});
        req.logout();
        res.redirect(CLIENT_HOME_PAGE_URL);
});

// Check if the user is logged
router.get('/check', function (req, res) {
    res.status(200).json({ result: req.isAuthenticated()});
});

// Show details about logged user
router.get('/details', function (req, res) {
    if (req.user){
        //console.log ("Found user with provider id"+req.user.user);
        UsersModel(sequelize).findAll({
            where: {
                idProvider: req.user.user
            },}).
        then(function(UsersCheck) {
            res.status(200).json({
                result: {
                    "name":req.user.name,
                    "idUser": UsersCheck[0].idUser,
                    "isAdmin": UsersCheck[0].isAdmin,
                    "cookies": req.cookies,
                    "success": true,
                    "message": "user has successfully authenticated",
                    "user": req.user
                } });
        }, function(error) { });
    }
    else {
        res.status(200).json({ result: null});
    }

});

// Set permission for admin
router.put('/admin-permission/set/user/:id', function (req, res) {
    UsersModel (sequelize).update({
            isAdmin: 1
        },

        {
            where: {
            idUser: req.params.id
        }}).
        then(function(Users) {
                res.status(200).json({result: "ok"});
        }, function(error) {
            res.status(500).send({result: "ok"});
        });
});

// Unset permission for admin
router.put('/admin-permission/unset/user/:id', function (req, res) {
    UsersModel (sequelize).update({
            isAdmin: 0
        },
        {
            where: {
                idUser: req.params.id
            }}).
    then(function(Users) {
        res.status(200).json({result: "ok"});
    }, function(error) {
        res.status(500).send({result: "ok"});
    });
});

router.get('/facebook/callback',
    passport.authenticate('facebook', {
        //successRedirect : '/authorization/success', // redirect to the secure profile section
        successRedirect : CLIENT_HOME_PAGE_URL, // redirect to the secure profile section
        failureRedirect : '/authorization/failure', // redirect back to the signup page if there is an error
    }));

// Success login
router.get('/success', function(req, res) {
    res.json({ result: "ok" });
});

// Error login
router.get('/failure', function(req, res) {
    res.json({ result: "error" });
});

module.exports = router;