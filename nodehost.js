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
const nodemailer = require("nodemailer");
const email_validator = require("email-validator");
//var tld_parser = require('tld-extract');
//const nodemailerfunc = require('./config/nodemailerfunc')
const SESSION_SECRET = process.env.SESSION_SECRET;
const HOSTPATH = process.env.HOSTPATH;

//var sphp = require('sphp');

const ejs = require('ejs');
const Active = require('./models/active');
// Initialise Express
var app = express();
//app.use(sphp.express('public/'));
// Render static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true}));
app.use(morgan('dev'));
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
app.use('/public', express.static('public'));

//Connect to MongoDB
const dbURI = process.env.DBURI;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
        console.log("connected to MongoDB")
        app.listen(process.env.PORT || 3030) // This is actually the port it will listen on, default 3030 as of now.
        console.log("Listening on port 3030. Check code for more info.");
    })
    .catch((err) => {
        console.log(err);
    })



// async..await is not allowed in global scope, must use a wrapper
async function nodeMailerMain() {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  //let testAccount = await nodemailer.createTestAccount().catch((err) => console.log(err))

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.google.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.TSLAUSER, // generated ethereal user
      pass: process.env.TSLAPASS, // generated ethereal password
    },
  })//.catch((err) => console.log(err))

  //console.log(testAccount.smtp.host);

  console.log("successfully created transporter");

  let message = {
    from: 'Tsla <tengtsla@gmail.com>',
    to: 'Me <medele5794@inst.hcpss.org>',
    subject: 'Nodemailer is unicode friendly ✔',
    text: 'Hello to myself!',
    html: '<p><b>Hello</b> to myself!</p>'
  };

  // send mail with defined transport object
  transporter.sendMail(message, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Email sent: ' + info.response);
    //console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  
    // Preview only available when sending through an Ethereal account
    //console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  });
}



// Set the view engine to ejs
app.set('view engine', 'ejs');

// *** GET Routes - display pages ***
// Root Route
app.post('/rapidorder', (req, res) => {
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

app.get('/rapidorder', function (req, res) {
    res.render('pages/rapidorder.ejs');
});
app.get('/info', function (req, res) {
    res.render('pages/info.ejs');
});
app.get('/information', function (req, res) {
    res.redirect('/info');
});

app.get('/staff/orders', function (req, res) {
    Order.find().sort({ createdAt: -1 })
        .then((result) => {
            res.render('pages/staff-orders.ejs', {orders: result})
        })
        .catch((err) => {
            console.log(err);
        });
});

app.get('/staff/menu', function (req, res) {
    res.render('pages/staff-menu.ejs');
})

app.delete('/staff/:id', (req, res) => {
    const id = req.params.id;
    Order.findByIdAndDelete(id)
        .catch((err) => console.log(err));
})

app.get('/profile', function (req, res) {
    //console.log(req.isAuthenticated());
    res.render('pages/profile/profile',{authStatus: req.isAuthenticated(), user: req.user, HOSTPATH: HOSTPATH});
});

app.post('/profile/register', function (req, res) {
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
                    password : password
                });
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
                            if (err) throw err;
                                //save pass to hash
                                newUser.password = hash;
                            //save user
                            newUser.save()
                            .then((value)=>{
                                newActive.save()
                                //send confirmation email
                                nodeMailerMain();
                                req.flash('success_msg','You have now registered and logged in!')
                                res.redirect('/profile');
                                });
                            })
                            //.catch(err=> console.log(err));
                            
                        });
                })
             //ELSE statement ends here
            }
        });
    }
})

app.post('/profile/login', (req, res, next) => {
    passport.authenticate('local',{
        successRedirect : '/profile',
        failureRedirect : '/profile/login',
        failureFlash : true,
        })(req,res,next);
})

app.get('/profile/login', function (req, res) {
    res.render('pages/profile/login', {HOSTPATH: HOSTPATH});
});

app.get('/profile/register', function (req, res) {
    res.render('pages/profile/register', {HOSTPATH: HOSTPATH});
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
app.get('/staff', function (req, res) {
    res.redirect('/staff/orders');
})

app.get('/profile/confirm/:hash', (req, res) => {
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

app.post('/staff/menu', (req, res) => {
    var menu = req.body.menu;
    //save to menu.json

    /*fs.readFile(__dirname+'/link-data.json', (err, data)=>{
        if (err) throw err
        dataJson = JSON.parse(data) //object with your link-data.json file
        postData = JSON.parse(body) //postData is the variable containing your data coming from the client.
        dataJson.push(postData)//adds the data into the json file.

        //Update file
        fs.writeFile(__dirname+'/link-data.json', JSON.stringify(dataJson), (err)=>{
            if(err) console.log(err)
            res.end()
        })
    })*/
})

app.use((req, res, next) => {
    res.status(404).redirect('/');
  })