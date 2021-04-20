const mysql = require ('mysql');
const path = require ('path');
const session = require ('express-session');
const express = require ('express');
const cookieParser = require ('cookie-parser');
var CryptoJS = require ('crypto-js');
//var router = express.Router ();
const app = express ();
const fs = require ('fs');
app.use (cookieParser ());
app.use (express.urlencoded ({extended: true}));
app.use (express.json ());
var connection = false;
var port = 3001; //80;
const cors = require('cors');


/*----------------------Setup-----------------------------*/

if (process.env.NODE_ENV === "production") {
  app.use (express.static (path.resolve (__dirname, '../front_end/momentus/build')));
}
app.use (
  session ({secret: 'CSC648csc!', resave: false, saveUninitialized: false})
);
app.use(cors());

/*----------------------Prepare---------------------------*/

connectSql ();

function connectSql () {
  connection = mysql.createConnection ({
    host: 'csc648db.ctbbxcp0jnib.us-west-1.rds.amazonaws.com',
    user: 'admin',
    password: 'CSC648csc!',
    port: '3306',
  });

  connection.connect (function (error) {
    if (error) {
      console.log (error);
    } else {
      console.log ('Connected to AWS server');
      createDatabase ();
    }
  });
}

function createDatabase () {
  connection.query ('CREATE DATABASE IF NOT EXISTS mydb', function (
    error,
    result
  ) {
    connection = mysql.createConnection ({
      host: 'csc648db.ctbbxcp0jnib.us-west-1.rds.amazonaws.com',
      user: 'admin',
      password: 'CSC648csc!',
      port: '3306',
      database: 'mydb',
      multipleStatements: true,
    });
    resetDatabase();
    prepareTables ();
  });
}

function prepareTables () {
	
  var preparation = fs.readFileSync (__dirname + '/prepareDB.sql').toString ();
  var fill = fs.readFileSync (__dirname + '/prefillDB.sql').toString ();
  connection.query (preparation, function (error, result) {
    if (error) {
      console.log (error);
    }
  });
  connection.query (fill, function (error, result) {
    if (error) {
      console.log (error);
    }
  });
}

function resetDatabase () {
  var query =
    'SET FOREIGN_KEY_CHECKS = 0; DROP TABLE Post; DROP TABLE Users; DROP TABLE Comments; DROP TABLE Favorites; DROP TABLE Following; DROP TABLE Messages; DROP TABLE Collections; DROP TABLE Collection_Content; SET FOREIGN_KEY_CHECKS = 1;';
  connection.query (query, function (error, result) {
    if (error) {
      console.log (error);
    }
  });
}



  
// EXPRESS ROUTES
// requests gets routed to ../routes/ to keep app.js clean
// TODO: Seperate into categories / add more, examples are the ones commented out
app.use("/", require("./routes/index.js"));
//app.use("/api/users", require("../routes/users"));
//app.use('/api/posts', require('../routes/listings'));



var server = app.listen(process.env.PORT || 3001)
console.log (`server online at port ${port}`);
