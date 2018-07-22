/*
* @Author: hanjiyun
* @Date:   2018-07-21 19:16:08
* @Last Modified by:   hanjiyun
* @Last Modified time: 2018-07-22 14:09:01
*/

var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'zoocerdb.mysql.rds.aliyuncs.com',
  user     : 'huana',
  password : 'huana@2018',
  database : 'huana'
});

connection.connect();

module.exports = connection;