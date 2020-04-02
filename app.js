var express = require('express');

var ejs = require('ejs');

var bodyParser = require('body-parser');

var parser = bodyParser.urlencoded({ extended: false });

var appController = require('./Controller/controller-web');



var app = express();



app.set('view engine', 'ejs');

app.use('/assets', express.static('assets'));

appController(app, parser);


app.listen('5000');