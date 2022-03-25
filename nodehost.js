//It's not me, It's you, goodbye my not love, I will always forget you

// Load Node modules
var express = require('express');
const morgan = require('morgan')
const mongoose = require('mongoose');
const Order = require('./models/order');
const User = require("./models/user.js");
const bcrypt = require('bcrypt');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
require("./config/passport")(passport)
const {ensureAuthenticated} = require("/workspace/rapidserver/config/auth.js")

//var sphp = require('sphp');

const ejs = require('ejs');
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
    secret : 'secret',
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
    res.render('pages/profile/profile');
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
        errors.push({msg : 'password must be at least 6 characters'})
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
                    email : email,
                    password : password
                });
                   //hash password
                bcrypt.genSalt(10,(err,salt)=> 
                bcrypt.hash(newUser.password,salt,
                    (err,hash)=> {
                        if(err) throw err;
                            //save pass to hash
                            newUser.password = hash;
                        //save user
                        newUser.save()
                        .then((value)=>{
                            //console.log(value)
                            req.flash('success_msg','You have now registered!')
                        res.redirect('/profile/login');
                        })
                        .catch(value=> console.log(value));
                        
                    }));
             //ELSE statement ends here
            }
        });
    }
})

app.post('/profile/login', (req, res, next) => {
    passport.authenticate('local',{
        successRedirect : '/home',
        failureRedirect : '/profile/login',
        failureFlash : true,
        })(req,res,next);
})

app.get('/profile/login', function (req, res) {
    res.render('pages/profile/login');
});

app.get('/profile/register', function (req, res) {
    res.render('pages/profile/register');
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
    res.redirect('/home');
});
app.get('/staff', function (req, res) {
    res.redirect('/staff/orders');
})
app.use((req, res, next) => {
    console.log("404");
    res.status(404).redirect('/');
  })