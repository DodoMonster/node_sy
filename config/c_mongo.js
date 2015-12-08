var mongoose = require('mongoose');

var dbName = 'syDB';
var connectionString = 'mongodb://localhost:27017/' + dbName;

var connection = mongoose.connect(connectionString,  function(err) {
  if (err) {
    console.log('连接失败');
  }else {
    console.log('连接成功');
  }
});

module.exports = connection;
