var express = require('express');
var app = express();
const cookieParser = require("cookie-parser");
const session = require("express-session");
const bodyParser=require('body-parser');
app.set('view engine', 'ejs');
app.use(express.static('views'))
app.use('/upload',express.static('upload'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(cookieParser());
app.use(
    session({
        key: "user_sid",
        secret: "somerandomstuff",
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 6000,
        },
    })
);


var router= require('./controller/router');
var db= require('./db.js');
app.use('/',router);
app.listen(8000); 