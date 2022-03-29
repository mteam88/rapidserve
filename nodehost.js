//It's not me, It's you, goodbye my not love, I will always forget you

// Load Node modules
require('dotenv').config({path: __dirname + '/.env'});
var express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Order = require('./models/order');
const User = require("./models/user.js");
const bcrypt = require('bcrypt');
const session = require('cookie-session');
const flash = require('connect-flash');
const crypto = require('crypto');
const passport = require('passport');
const fs = require('fs');
require("./config/passport")(passport);
const nodemailer= require("nodemailer");
const email_validator = require("email-validator");
const profileRouter = require("./routes/profileRouter");
const staffRouter = require("./routes/staffRouter");
const nodeMailerMain = require("./config/nodeMailerMain")
//var tld_parser = require('tld-extract');
//const nodemailerfunc = require('./config/nodemailerfunc')
const SESSION_SECRET = process.env.SESSION_SECRET;
const HOSTPATH = process.env.HOSTPATH;
const APPURL = process.env.APPURL;
exports.APPURL = APPURL;

//var sphp = require('sphp');

const ejs = require('ejs');
const Active = require('./models/active');
const { ensureAuthenticated } = require('./config/auth');
// Initialise Express
var app = express();
//app.use(sphp.express('public/'));
// Render static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true}));
app.use(morgan('tiny'));
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});
app.use(session({
    keys : [SESSION_SECRET],
    resave : true,
    saveUninitialized : true
   }));
   //use flash
   app.use(passport.initialize());
    app.use(passport.session());
   app.use(flash());
   app.use((req,res,next)=> {
     res.locals.success_msg = req.flash('success_msg');
     res.locals.error_msg = req.flash('error_msg');
     res.locals.error  = req.flash('error');
   next();
   })

// using app.use to serve up static CSS files in public/assets/ folder when /public link is called in ejs files
// app.use("/route", express.static("foldername"));
app.use('/profile', profileRouter);
app.use('/staff', staffRouter);
app.use('/public', express.static('public'));

//Connect to MongoDB
const dbURI = process.env.DBURI;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
        console.log("connected to MongoDB")
        app.listen(process.env.PORT || 3030) // Listens on env variable if set, alternative 3030.
        console.log("Listening on port " + process.env.PORT + ". Check code for more info.");
    })
    .catch((err) => {
        console.log(err);
    })



// Set the view engine to ejs
app.set('view engine', 'ejs');

// *** GET Routes - display pages ***
// Root Route
app.post('/rapidorder', ensureAuthenticated, function (req, res, next) {
    console.log(req.body);
    const order = new Order(req.body);
    order.save()
        .then((result) => {
            res.json({status: 'success'});
        })
        .catch((err) => {
            console.log(err);
            res.json({status: 'err'})
        })
})


app.get('/', function (req, res) {
    res.redirect('/home');
});

app.get('/rapidorder', ensureAuthenticated, function (req, res, next) {
    res.render('pages/rapidorder.ejs');
});
app.get('/info', function (req, res) {
    res.render('pages/info.ejs');
});
app.get('/information', function (req, res) {
    res.redirect('/info');
});
app.get('/home', function (req, res) {
    res.render('pages/index');
});
app.get('/main', function (req, res) {
    res.redirect('/home');
});
app.get('/history', function (req, res) {
    res.render('pages/history.ejs');
});
app.get('/rapid', function (req, res) {
    res.redirect('/home');
});
app.get('/rapidserve', function (req, res) {
    res.redirect('/home');
});
app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/profile');
});

app.use((req, res, next) => {
    res.status(404);
    console.log('404 status, request to ' + req.url);
    res.redirect('/');
  })