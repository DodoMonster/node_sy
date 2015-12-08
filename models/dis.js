var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
var connection = require('../config/c_mongo');
var Schema = mongoose.Schema;

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
