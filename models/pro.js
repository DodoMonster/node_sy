var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
var connection = require('../config/c_mongo');
var Schema = mongoose.Schema;

var proSchema = new Schema({
  intime: String,
  outtime: String,
  number: Number,
  suyuancode: String,
  pici: Number,
  category: String,
  state: String,
  price: Number,
  isSaled: String,
});
autoIncrement.initialize(connection);
proSchema.plugin(autoIncrement.plugin, {
  model: 'pro', //数据模块，需要跟同名 x.model("Books", BooksSchema);
  field: 'animalId', //字段名
  startAt: 1, //开始位置，自定义
  incrementBy: 1, //每次自增数量
});
module.exports = mongoose.model('Pro', proSchema);