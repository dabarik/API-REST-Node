var express = require('express');
var app = express();
var mysql = require('mysql');
var url = require('url');

// Database

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "projetnode"
})
con.connect(function (err) {
    if (err) {
        console.log('error in connection');
    }
    console.log('connection done');
})

// Configure Routes
app.get('/projets', function (req, res, next) {
    con.query(
        'SELECT * FROM projets',
        function (err, rows) {
            if (err) throw err;
            console.log(err);
            if (rows.length > 0) {
                res.status(200).json({
                    'projets': rows
                })
            } else {
                rows = 'null';
            }
        }
    )
});

app.get('/projets/:id/', function (req, res, next) {
    con.query(
        'SELECT * FROM projets WHERE id = ' + req.params.id,
        function (err, rows) {
            if (err) throw err;
            console.log(err);
            if (rows.length > 0) {
                res.status(200).json({
                    'projets': rows
                });
            } else {
                res.status(200).json({'projets': 'there is no such id in the database'});
            }
        }
    )
});

// 404
app.use(function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({
        'Error': 'Url not found'
    });
});


app.listen(8080);