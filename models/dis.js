var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
var Schema = mongoose.Schema;

var dbName = 'syDB';
var connectionString = 'mongodb://localhost:27017/' + dbName;

var connection = mongoose.connect(connectionString,  function(err) {
  if (err) {
    console.log('连接失败');
  }else {
    console.log('连接成功');
  }
});

var disSchema = new Schema({
  id:Number,
  name:String,
  telephone:String,
  address:String,
});

autoIncrement.initialize(connection);
disSchema.plugin(autoIncrement.plugin, {
  model: 'dis',   //数据模块，需要跟同名 x.model("Books", BooksSchema);
  field: 'id',     //字段名
  startAt: 1,    //开始位置，自定义
  incrementBy: 1,   //每次自增数量
});
module.exports = mongoose.model('Dis', disSchema);
