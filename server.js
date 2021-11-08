//It's not me, It's you, goodbye my not love, I will always forget you

// Load Node modules
var express = require('express');
const ejs = require('ejs');
// Initialise Express
var app = express();
// Render static files
app.use(express.static('public'));
// using app.use to serve up static CSS files in public/assets/ folder when /public link is called in ejs files
// app.use("/route", express.static("foldername"));
app.use('/public', express.static('public'));
// Set the view engine to ejs
app.set('view engine', 'ejs');
// Port website will run on
app.listen(8080);


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
    res.render('pages/staff.ejs');
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

function encode256(number) {
    var bigString = number.toString();
    var bigOne = BigInt(bigString);

    var base256 = [];
    do {
        base256.unshift(Number(bigOne%256n));
        bigOne = bigOne/256n;
    } while (bigOne)
  
    var encodedNumber = "";
    var base256Len = base256.length;
    for (var i = 0;i < base256Len;i++) {
        encodedNumber += String.fromCharCode(base256[i]);
    }
    return encodedNumber;
}

function decode256(encodedNumber) {
    var decodedNumber = 0;
    var encodedNumberAry = "";
    var encodedNumberLen = encodedNumber.length;
    for (var i = 0;i < encodedNumberLen;i++) {
	    encodedNumberAry += encodedNumber.charCodeAt(i);
    }
    encodedNumber = encodedNumberAry.split("");
    encodedNumberLen = encodedNumber.length;
    for (var i = 0;i < encodedNumberLen;i++) {
	    if (i == encodedNumberLen - 1) {
    	    decodedNumber = encodedNumber[i];
        } else {
    	    encodedNumber[i + 1] = Number(encodedNumber[i + 1]) + 256 * Number(encodedNumber[i]);
            encodedNumber[i + 1] = encodedNumber[i + 1].toString();
        }
    }

    return decodedNumber;
}