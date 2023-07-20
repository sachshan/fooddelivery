const express = require("express"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    bodyParser = require("body-parser"),
    LocalStrategy = require("passport-local"),
    passportLocalMongoose = 
        require("passport-local-mongoose")
    path = require('path');
const router = require('./Backend/route/router');
const User = require("./Backend/model/User");
const app = express();
  
mongoose.connect("mongodb://127.0.0.1/db");
  
app.set("view engine", "ejs");
app.set('views', __dirname + '/Frontend/views');
app.use(express.static('Frontend/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require("express-session")({
    secret: " ",
    resave: false,
    saveUninitialized: false
}));
app.use('/', router);

//=====================
//PASSWORD AUTHENTICATION
//=====================
  
app.use(passport.initialize());
app.use(passport.session());
  
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

  
//=====================
//PORT
//=====================

var port = process.env.PORT || 3003;


app.listen(port, ()=>{
    console.log("Server is up on port "+port);
});