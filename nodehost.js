//It's not me, It's you, goodbye my not love, I will always forget you

// Load Node modules
var express = require('express');
const mongoose = require('mongoose');
const Order = require('./models/order');

//var sphp = require('sphp');

const ejs = require('ejs');
// Initialise Express
var app = express();
//app.use(sphp.express('public/'));
// Render static files
app.use(express.static('public'));
// using app.use to serve up static CSS files in public/assets/ folder when /public link is called in ejs files
// app.use("/route", express.static("foldername"));
app.use('/public', express.static('public'));

//Connect to MongoDB
const dbURI = "mongodb+srv://rapidserver:nHz0ChzcY1JuBDG3@rapidserve.m4dah.mongodb.net/rapiddata?retryWrites=true&w=majority";
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
        console.log("connected to MongoDB")
        app.listen(3030) // This is actually the port it will listen on, default 8080 as of now.
        console.log("Listening on port 3030. Check code for more info.");
    })
    .catch((err) => {
        console.log(err);
    })



// Set the view engine to ejs
app.set('view engine', 'ejs');

//Mongoose and mongo sandbox route
app.get('/add-order', (req, res) => {
    const order = new Order({
        orderBody: "HelloWorld"
    });

    order.save()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        });
});

app.get('/all-orders', (req,res) => {
    Order.find()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        });
})





// *** GET Routes - display pages ***
// Root Route
app.get('/', function (req, res) {
    res.redirect('/home');
});
app.get('/rapidpoll', function (req, res) {
    res.render('pages/rapidpoll.ejs');
});
app.get('/rapidorder', function (req, res) {
    res.render('pages/rapidorder.ejs');
});
app.get('/info', function (req, res) {
    res.render('pages/info.ejs');
});
app.get('/information', function (req, res) {
    res.redirect('/info');
});
app.get('/lunchstaff', function (req, res) {
    Order.find()
        .then((result) => {
            res.render('./pages/staff.ejs', {orders: result})
        })
        .catch((err) => {
            console.log(err);
        });
});

app.get('/home', function (req, res) {
    res.render('pages/index');
});
app.get('/main', function (req, res) {
    res.redirect('/home');
});
app.get('/rapid', function (req, res) {
    res.redirect('/home');
});
app.get('/rapidserve', function (req, res) {
    res.redirect('/home');
});
app.use((req, res, next) => {
    res.status(404).redirect('/');
  });