const mysql = require('mysql');
const path = require("path");
const session = require('express-session');
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const fs = require('fs');
app.use(cookieParser());
var connection = false;

app.use(express.static(path.resolve(__dirname, '../front')));

/*----------------------Prepare---------------------------*/

connectSql();

function connectSql() {
    connection = mysql.createConnection({
        host: "csc648db.ctbbxcp0jnib.us-west-1.rds.amazonaws.com",
        user: "admin",
        password: "CSC648csc!",
        port: "3306"
    });

    connection.connect(function(error) {
        if (error) {
            console.log(error);
        } else {
            createDatabase();
        }
    });
}

function createDatabase() {
    connection.query("CREATE DATABASE IF NOT EXISTS mydb", function (error, result) {
        connection = mysql.createConnection({
            host: "csc648db.ctbbxcp0jnib.us-west-1.rds.amazonaws.com",
            user: "admin",
            password: "CSC648csc!",
        	port: "3306",
            database: "mydb",
            multipleStatements: true
        });
        //prepareTables();
        /**connection.query("SELECT * FROM Post", function (error, result, field) {
    		if (error) {
    			console.log(error);
    		} else {
    			console.log(result);
	        }
  		});**/
        //resetDatabase();
    });
}

function prepareTables() {
	var preparation = fs.readFileSync(__dirname + "/prepareDB.sql").toString();
    connection.query(preparation, function (error, result) {
        if (error) {
            console.log(error);
        } 
    });
}

function resetDatabase() {
    return;
}

/*---------------------Functions----------------------------*/

function getTop20Posts(nextFunction) { 
    var postQuery = "SELECT * FROM Post";
    var matchQuery = "SELECT userID FROM Post";
    var userQuery = "SELECT userID, username, pfpURL FROM Users WHERE userID IN (" + matchQuery + ")";
    var fullQuery = postQuery + " NATURAL JOIN (" + userQuery + ") AS U LIMIT 20";
    connection.query(fullQuery, function (error, result) {
        if (error) {
            console.log(error);
        } else {
            //console.log(fullQuery);
            //console.log(result);
            nextFunction(JSON.stringify(result));
        }
    });
}

/*----------------------AJAX---------------------------*/

app.get('/', function (req, res) {
    res.sendFile(path.resolve(__dirname, '../front') + '/index.html');
});

app.get('/getHome', function (req, res) {
    console.log("/getHome");
    var output = getTop20Posts(function(input) {
        res.send(input);
    });
});

var server = app.listen(3000);
//var server = app.listen(80);
console.log("server online");


