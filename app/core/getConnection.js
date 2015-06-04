var mysql = require('mysql2');
var conf = require('../../config');
var pool;

module.exports = () => {
  pool = pool || mysql.createPool(conf.mysql);
  return pool;
};