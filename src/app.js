//tedious is library for Azure SQL connection
var tediousExpress = require('express4-tedious');
var TYPES = require('tedious').TYPES;
var ConnectionSQL = require('tedious').Connection;
var Request = require('tedious').Request;

var connectionData = {
    userName: 'alexras',
    password: '!QAZxsw2#EDC',
    server: 'alexrassql1.database.windows.net',
    options:
    {
        database: 'alexrasiot',
        encrypt: true
    }
};

var connection = new ConnectionSQL(connectionData);
connection.on('connect', function (err) {

    if (err) {
        console.error(err);
    } else {
        console.log('Database connection successful');
    }

});


var express = require('express');
var app = express();
app.use(function (req, res, next) {
    req.sql = tediousExpress(connectionData);
    next();
});
app.use(express.json());
app.use(express.static('.'));

app.get('/', function (req, res) {
  res.sendfile('index.html');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

app.get('/locations', function (req, res) {
    req.sql("select long as lat, lat as lng from locations for json path")
        .into(res);
});

