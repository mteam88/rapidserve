var express = require('express')
var router = express.Router()
const email_validator = require('email-validator');
const nodeMailerMain = require("../config/nodeMailerMain")

require('dotenv').config({path: __dirname + '/.env'});
var express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Order = require('../models/order');
const User = require("../models/user.js");
const bcrypt = require('bcrypt');
const session = require('cookie-session');
const flash = require('connect-flash');
const crypto = require('crypto');
const passport = require('passport');
const fs = require('fs');
require("../config/passport")(passport);
const nodemailer= require("nodemailer");

const Active = require('../models/active');
const { ensureAuthenticated, hasPerm } = require('../config/auth');

HOSTPATH = process.env.HOSTPATH;

router.get('/', function (req, res) {
    //console.log(req.isAuthenticated());
    //res.send(process.cwd());
    res.render('pages/profile/profile',{authStatus: req.isAuthenticated(), user: req.user, HOSTPATH: HOSTPATH});
});

router.post('/register', function (req, res) {
    const {name,email, password, password2} = req.body;
    let errors = [];
    //console.log(' Name ' + name+ ' email :' + email+ ' pass:' + password);
    if(!name || !email || !password || !password2) {
        errors.push({msg : "Please fill in all fields"})
    }
    //check if match
    if(password !== password2) {
        errors.push({msg : "passwords dont match"});
    }

    //check if password is more than 6 characters
    if(password.length < 6 ) {
        errors.push({msg : 'password must be at least 6 characters'});
    }

    if (email_validator.validate(email) != true) {
        errors.push({msg : 'please enter a valid email'});
    } else {
        var email_server_address = email.split('@').pop()
        if (email_server_address != "inst.hcpss.org") {
            errors.push({msg : 'Use your HCPSS email address. It should end in "@inst.hcpss.org"'});
        }
    }

    if(errors.length > 0 ) {
    res.render('pages/profile/register', {
        errors : errors,
        name : name,
        email : email,
        password : password,
        password2 : password2});
    } else {
        //validation passed
        User.findOne({email : email}).exec((err,user)=>{
            //console.log(user);   
            if(user) {
                errors.push({msg: 'email already registered'});
                res.render('pages/profile/register',{errors,name,email,password,password2});
                
            } else {
                const newUser = new User({
                    name : name,
                    active: false,
                    email : email,
                    password : password,
                    permissions : {
                        canvieworders : false,
                        caneditmenu : false,
                        caneditperms : false
                    }
                })
                const newActive = new Active({
                    hash: "undefined",
                    userId: newUser._id
                })
                crypto.randomBytes(128, function(err, buffer) {
                    newActive.hash = buffer.toString('hex');
                    //console.log(newActive.hash);

                   //hash password
                    bcrypt.genSalt(10,(err,salt)=> {
                    bcrypt.hash(newUser.password,salt,
                        (err,hash)=> {
                            if (err) console.log("error");
                                //save password to hash
                                newUser.password = hash;
                            //save user
                            newUser.save()
                            .then((value)=>{
                                console.log("no err")
                                newActive.save()
                                //send confirmation email:
                                //nodeMailerMain();

                                req.flash('success_msg','You have now registered and logged in!') //maybe not working
                                res.redirect('/profile');
                                })
                                .catch(err=> console.log(err));
                            });
                            
                        });
                })
             //ELSE statement ends here
            }
        });
    }
})

router.post('/login', (req, res, next) => {
    passport.authenticate('local',{
        successRedirect : '/profile',
        failureRedirect : '/profile/login',
        failureFlash : true,
        })(req,res,next);
})

router.get('/login', function (req, res) {
    res.render('pages/profile/login', {HOSTPATH: HOSTPATH});
});

router.get('/register', function (req, res) {
    res.render('pages/profile/register', {HOSTPATH: HOSTPATH});
});

router.get('/confirm/:hash', (req, res) => {
    var reqhash = req.params.hash;
    Active.findOneAndDelete({ hash: reqhash })
        .then((value) => {
            User.updateOne(
                {"_id": value.userId},
                { $set: { active: true}}
                ).then(() => {
                    res.redirect('/profile');
                })
        })
})

module.exports = router;