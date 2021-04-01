const path = require("path");
const express = require("express");
const mysql = require('mysql');
const app = express();
const PORT = process.env.PORT || 3001;

var connection = mysql.createConnection({
  host     : "csc648db.ctbbxcp0jnib.us-west-1.rds.amazonaws.com",
  user     : "admin",
  password : "CSC648csc!",
  port     : "3306"
});

//....
// I changed this github lemme update you idiot

connection.connect((err) => {
  if(err){
    console.log(err)  
    throw err
      
  } else {
      console.log("connected")
  }
})
// For testing / vertical prototype purposes: These will be streamlined / changed later

// create user
/* app.post('/createUser', (req, res) =>{
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
}) */


// return all posts - should be used only for vert. prototype, not in final version
/* app.get('/getAllUsers', (req, res, next) => {
  connection.query('SELECT * FROM users;', (err, results, fields) => 
  {
      if (err) {
          next(err);
      }
          console.log(results);
          res.send(results);
  })
  
}); */

// get a specific post
// there's a typo so make sure it's 'post' not 'posts' for now... fix later
// not working properly, come back later
/* app.get('api/post/:id(\\d+)', (req, res, next) => {
  let postId = req.params.id;
  let baseSQL = `SELECT type FROM post WHERE postID = ${postID}`;
  db.execute(baseSQL, [postId])
  .then(([results, fields]) => {
    if(results && resumlts.length) {
      let post = results[0]; // title
      console.log(post);
      res.send(post);
    }
  })
}) */

// return all posts - for vertical prototype
app.get('/api/getAllPosts', (req, res, next) => {
  connection.query('SELECT * FROM post;', (err, results, fields) => 
  {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        next(err);

      }
          console.log(results);
          res.send(results);
  })
  
}); 

// return all users - for vertical prototype
app.get('/api/getAllUsers', (req, res, next) => {
  connection.query('SELECT * FROM users;', (err, results, fields) => 
  {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        next(err);

      }
          console.log(results);
          res.send(results);
  })
  
}); 

// get username and pfp url from user id to display on posts
app.get('/api/user/:id(\\d+)', (req, res, next) => {
  let userID = req.params.id;
  connection.query(`SELECT username, pfpURL FROM users WHERE userID = ${userID}`, (err, results, fields) => 
  {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        next(err);

      }
          console.log(results);
          res.send(results);
  })
  
}); 





// Allows Node to serve up React app
app.use(express.static(path.resolve(__dirname, '../front_end/momentus/build')));

// for vertical prototype: just load the data right away
app.get("/api", (req, res) => {
  // test to see if connected to api
  res.json({ message: "Welcome to Momentus." });
});

// Any other get requests will show default react page
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../front_end/momentus/public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});