// Use this how you may Cedric. Test run it with `node connect.js`

const mysql = require('mysql');
const http = require('http')
const fs = require('fs')

var conpool = mysql.createPool({
  host: 'remotemysql.com',
  port: '3306',
  user: '1PWxjfOccD',
  password: 'vsrCGjpOWn',
  database: '1PWxjfOccD'
});

conpool.getConnection(function(err) {
  if (err) throw err;
  conpool.query("SELECT * FROM orders", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
});

console.log("hello")