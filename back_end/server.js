const express = require('express');
const mysql = require('mysql');
const app = express();
const db = require('../config/database');

var connection = mysql.createConnection({
    host: "localhost",
    user: "root", 
    password: "password",
    database: "SocialMedia",
    port: "3306"
})

connection.connect((err) => {
    if(err){
        throw err
    } else {
        console.log("connected")
    }
})
// For testing / vertical prototype purposes: These will be streamlined / changed later

// create user
app.post('/createUser', (req, res) =>{
    //try to keep the values pulled from the front-end the same as what's used here, or change accordingly
    let username = req.body.username
    let password = req.body.password
    let email = req.body.email
    let firstName = req.body.firstName
    let lastName = req.body.lastName
    let city = req.body.city
    let state = req.body.state
    let DOB = req.body.DOB

    //query to test if sign-up for our platform gets sent to the DB
    let registrationSQL = 'INSERT INTO users (email, username, password, firstName, lastName, city, state, DOB, registeredTime) VALUES (?, ?, ?, ?, ?, ?, ?, ?, now())'
    connection.query(registrationSQL, 
    [email, username, password, firstName, lastName, city, state, DOB], (err, result) => {
        if(err){
            console.log(err)
        } else {
            res.send("Values successfully stored, user created :-)")
        }
    }
    );
})


// return all posts - should be used only for vert. prototype, not in final version
router.get('/getAllUsers', (req, res, next) => {
    connection.query('SELECT * FROM users;', (err, results, fields) => 
    {
        if (err) {
            next(err);
        }
            console.log(results);
            res.send(results);
    })
    
});

// return all users - for vertical prototype
app.get('/getAllUsers', (req, res, next) => {
    connection.query('SELECT * FROM users;', (err, results, fields) => 
    {
        if (err) {
            next(err);
        }
            console.log(results);
            res.send(results);
    })
    
});

// return all collections - for vertical prototype
app.get('/getAllCollections', (req, res, next) => {
    connection.query('SELECT * FROM users;', (err, results, fields) => 
    {
        if (err) {
            next(err);
        }
            console.log(results);
            res.send(results);
    })
    
});



connection.query

const port = process.env.PORT || 5000;
app.listen(port);

console.log("App is listening on port: " + port);