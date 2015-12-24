var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');
var dis = require('./routes/dis.router.js');
var pro = require('./routes/pro.router.js');
var pur = require('./routes/pur.router.js');
var ship = require('./routes/ship.router.js');
var app = express();

app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(path.join(__dirname, '/public/dis')));
app.use(express.static(path.join(__dirname, '/public/pro')));
app.use(express.static(path.join(__dirname, '/public/sup')));

app.get('/', function(req, res) {
  res.sendFile('/index.html');
});

app.get('/pro', function(req, res) {
  res.sendFile(path.join(__dirname, 'public', 'pro', 'index.html'));
});

app.get('/pro/*', function(req, res) {
  res.redirect('/pro');
});

app.get('/dis', function(req, res) {
  res.sendFile(path.join(__dirname, 'public', 'dis', 'index.html'));
});

app.get('/dis/*', function(req, res) {
  res.redirect('/dis');
});

app.get('/sup', function(req, res) {
  res.sendFile(path.join(__dirname, 'public', 'sup', 'index.html'));
});

app.get('/sup/*', function(req, res) {
  res.redirect('/sup');
});

app.use('/api', dis);
app.use('/api', pro);
app.use('/api', pur);
app.use('/api', ship);

app.listen(app.get('port'), function() {
  console.log('running on port:' + app.get('port'));
});
