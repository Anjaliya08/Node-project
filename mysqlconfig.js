var mysql=require('mysql2');
var con=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:"w7301@Anj#",
    database:"mydb"
});
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "INSERT INTO booking (orderno, name, address, mobile) VALUES ?";
  var values = [
    [101,'Anjali', 'sagarpur',8799740548],
    [102,'Peter', 'janakpuri',9627064928],
    [103,'Amy', 'dabri st 652',9560165653],
    [104,'Hannah', 'patel nagar 21',9650750180],
    [105,'Michael', 'shadipur 345',9810318778],
    
  ];
  con.query(sql, [values], function (err, result) {
    if (err) throw err;
    console.log("Number of records inserted: " + result.affectedRows);
  });
});
// con.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
//     var sql = "CREATE TABLE booking (orderno INT(20),name VARCHAR(255), address VARCHAR(255), mobile VARCHAR(20))";
//     con.query(sql, function (err, result) {
//       if (err) throw err;
//       console.log("Table created");
//     });
//   });
  
// con.connect(function(err) {
//     if (err) throw err;
//     //Select only "name" and "address" from "customers":
//     con.query("SELECT name FROM cust", function (err, result, fields) {
//       if (err) throw err;
//       console.log(result);
//     });
//   });
  

// con.connect(function(err) {
//     if (err) throw err;
//     //Select all customers and return the result object:
//     con.query("SELECT * FROM cust", function (err, result, fields) {
//       if (err) throw err;
//       console.log(result);
//     });
//   });
//     var sql = "INSERT INTO cust (name, address) VALUES ?";
//   var values = [
//     ['John', 'Highway 71'],
//     ['Peter', 'Lowstreet 4'],
//     ['Amy', 'Apple st 652'],
//     ['Hannah', 'Mountain 21'],
    
//   ];
//   con.query(sql, [values], function (err, result) {
//     if (err) throw err;
//     console.log("Number of records inserted: " + result.affectedRows);
//   });
//     var sql = "INSERT INTO cust (name, address) VALUES ('Company Inc', 'Highway 37')";
//   con.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log("1 record inserted");
//   });
    // var sql = "CREATE TABLE cust(name VARCHAR(255), address VARCHAR(255))";
    // con.query(sql, function(err,result){
    //     if(err) throw err;
    //     console.log("Table created");
    // });





    // con.query("CREATE DATABASE mydb", function (err, result) {
    //     if (err) throw err;
    //     console.log("Database created");
    //   });
