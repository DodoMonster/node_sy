var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');
var pur = require('./routes/pur.router.js');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.set('port', process.env.PORT || 3000);
app.use(express.static(path.join(__dirname, 'Sup')));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'Sup', 'index.html'));
});

app.get('/app/log', function(req, res) {
  res.redirect('/');
});

app.get('/app/baseSetting', function(req, res) {
  res.redirect('/');
});

app.get('/app/facSearch', function(req, res) {
  res.redirect('/');
});

app.get('/app/facSetting', function(req, res) {
  res.redirect('/');
});

app.get('/app/proSearch', function(req, res) {
  res.redirect('/');
});

app.get('/app/printTag', function(req, res) {
  res.redirect('/');
});

app.get('/app/inputTag', function(req, res) {
  res.redirect('/');
});

app.get('/app/storage', function(req, res) {
  res.redirect('/');
});

app.get('/app/main', function(req, res) {
  res.redirect('/');
});

app.use('/api', pur);
app.listen(app.get('port'), function() {
  console.log('running on port:' + app.get('port'));
});
