// Use this how you may Cedric. Test run it with `node /workspace/rapidservehtml/public/js/connect.js`
const mysql = require('mysql');
const http = require('http');
const fs = require('fs');
console.log("a");
var conpool = mysql.createPool({
  host: 'remotemysql.com',
  port: '3306',
  user: '1PWxjfOccD',
  password: 'JXLuoQC3xM', //Not real password talk to me at school if you have questions
  database: '1PWxjfOccD'
});
//GetOrders();
//CreateOrder(1, 10, "1");
//DeleteOrder(1);

function CreateOrder(UserID, Order, Notes) {
  //var dayId = date.getTime() / 1000 / 60 / 60 / 24;
  //var lastOrderDate = dayId;
  /*if (lastOrderDate == Math.floor(date)) {
    return {statusCode:2};
  }*/
  
  var date = new Date();

  var Time = date.getTime();
  conpool.getConnection(function(err) {
    if (err) throw err;
    var sql = `INSERT INTO orders (ID, OrderCode, Time, Notes) VALUES (${UserID}, ${Order}, ${Time}, ${Notes})`;
    conpool.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
    });
  });
}

function GetOrders() {
  conpool.getConnection(function(err) {
    if (err) throw err;
    conpool.query("SELECT * FROM orders", function (err, result, fields) {
      if (err) throw err;
      console.log(result);
    });
  });

}

// Send a request
xhttp.open("get", "https://3030-mteam88-rapidserver-3phd7aoe8mi.ws-us27.gitpod.io/public/js/connect.js");
xhttp.send();