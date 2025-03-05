var express = require('express');
var app = express();

app.get('/', function(req, res) {
    res.send("This is the index page");
});

app.get('/about', function(req, res) {
    res.send("Hello, this is the About Us page");
});

app.listen(4000);
