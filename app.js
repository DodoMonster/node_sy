var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');
var dis = require('./routes/dis.router.js');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.set('port', process.env.PORT || 3000);
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/app/distributor', function(req, res) {
  res.redirect('/');
});

app.get('/app/administrator', function(req, res) {
  res.redirect('/');
});

app.get('/app/aproducts', function(req, res) {
  res.redirect('/');
});

app.get('/app/pro_info', function(req, res) {
  res.redirect('/');
});

app.get('/app/goods', function(req, res) {
  res.redirect('/');
});

app.get('/app/main  ', function(req, res) {
  res.redirect('/');
});

app.use('/api', dis);
app.listen(app.get('port'), function() {
  console.log('running on port:' + app.get('port'));
});
