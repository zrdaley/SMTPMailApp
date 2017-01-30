"use strict"
var mysql      = require('mysql');
var express    = require("express");
var bodyParser = require("body-parser");
var dbconnection = require('./app/dbConnection');

//-----DATABASE-----//

var middleMan = new dbconnection.dbConnection(mysql, 'localhost', 'root','', 'smtp_emails');


//-----SERVER-----//

var app = express();
app.use(bodyParser.json());
app.use(express.static('public'));

var mailIndex = 0;

app.post("/readEmail", function (req, res) {

    console.log("POST Request to: /readEmail");
    mailIndex = req.body;
    res.json(mailIndex);
    res.status(200).send();
});

app.get("/readEmail", function (req, res) {

    console.log("POST Request to: /readEmail");
    res.json(mailIndex);
    res.status(200).send();
});


app.get('/data', function(req, res) {
    middleMan.getMail(res);
    console.log("GET request to /data")
});

app.listen(8080, function() {
    console.log('WebApp Server: Started');
});