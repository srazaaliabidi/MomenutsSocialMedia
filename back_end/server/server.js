const express = require('express');
const mysql = require('mysql');

const app = express();

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

app.post('/create-user', (req, res) =>{
    //try to keep the values pulled from the front-end the same as what's used here, or change accordingly
    const username = req.body.username
    const email = req.body.email
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const Gender = req.body.Gender
    const city = req.body.city
    const state = req.body.state
    const DOB = req.body.DOB

    //query to test if sign-up for our platform gets sent to the DB
    connection.query('INSERT INTO Users (username, firstName, lastName, Gender, city, state, DOB) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', 
    [username, email, firstName, lastName, Gender, city, state, DOB], (err, result) => {
        if(err){
            console.log(err)
        } else {
            res.send("Values successfully stored")
        }
    }
    );
})

connection.query

const port = process.env.PORT || 5000;
app.listen(port);

console.log("App is listening on port: " + port);