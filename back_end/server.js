const mysql = require ('mysql');
const path = require ('path');
const session = require ('express-session');
const express = require ('express');
const cookieParser = require ('cookie-parser');
var CryptoJS = require ('crypto-js');
var router = express.Router ();
const app = express ();
const fs = require ('fs');
app.use (cookieParser ());
app.use (express.urlencoded ({extended: true}));
app.use (express.json ());
var connection = false;
var port = 3001; //80;


if (process.env.NODE_ENV === "production") {
  app.use (express.static (path.resolve (__dirname, '../front_end/momentus/build')));
}
app.use (
  session ({secret: 'CSC648csc!', resave: false, saveUninitialized: false})
);


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

/*---------------------Functions----------------------------*/

function getTop20Posts (nextFunction) {
  var postQuery = 'SELECT * FROM Post';
  var matchQuery = 'SELECT userID FROM Post';
  var userQuery =
    'SELECT userID, username, pfpURL FROM Users WHERE userID IN (' +
    matchQuery +
    ')';
  var query = postQuery + ' NATURAL JOIN (' + userQuery + ') AS U LIMIT 20';
  connection.query (query, function (error, result) {
    if (error) {
      console.log (error);
    } else {
      nextFunction (JSON.stringify (result));
    }
  });
}

function getTop5Posts (nextFunction) {
  var postQuery = 'SELECT * FROM Post';
  var matchQuery = 'SELECT userID FROM Post';
  var userQuery =
    'SELECT userID, username, pfpURL FROM Users WHERE userID IN (' +
    matchQuery +
    ')';
  var query = postQuery + ' NATURAL JOIN (' + userQuery + ') AS U LIMIT 5';
  connection.query (query, function (error, result) {
    if (error) {
      console.log (error);
    } else {
      nextFunction (JSON.stringify (result));
    }
  });
}

function getSearch (searchTerm) {
  var query =
    'SELECT * FROM Post HAVING title like "%' +
    searchTerm +
    '%";';
  connection.query (query, function (error, result) {
    if (error) {
      console.log (error);
    } else {
      nextFunction (JSON.stringify (result));
    }
  });
}

function newUser (
  email,
  username,
  password,
  firstName,
  lastName,
  city,
  state,
  DOB,
  pfpURL,
  storeFunction,
  endFunction
) {
  var query =
    "INSERT INTO Users (email, username, password, firstName, lastName, city, state, DOB, pfpURL, privacy) VALUES ('" +
    email +
    "', '" +
    username +
    "', '" +
    encodePass (password) +
    "', '" +
    firstName +
    "', '" +
    lastName +
    "', '" +
    city +
    "', '" +
    state +
    "', '" +
    DOB +
    "', '" +
    pfpURL +
    "', '0');";
  connection.query (query, function (error, result) {
    if (error) {
      console.log (error);
      endFunction ('0');
    } else {
      storeFunction (username, result.insertId);
      endFunction ('1');
    }
  });
}

function verifyUser (username, password, storeFunction, endFunction) {
  var encodedPass = encodePass (password);
  var query =
    "SELECT userID FROM Users WHERE username = '" +
    username +
    "' AND password = '" +
    encodedPass +
    "';";
  connection.query (query, function (error, result) {
    if (error) {
      console.log (error);
      endFunction ('0');
    } else {
      if (result.length > 0) {
        storeFunction (username, result[0].userID);
        endFunction ('1');
      } else {
        endFunction ('0');
      }
    }
  });
}

function encodePass (pass) {
  var hash = CryptoJS.SHA256 (pass);
  return hash.toString (CryptoJS.enc.Base64);
}

function addPostText (userID, title, content, endFunction) {
  var date = new Date ();
  var query =
    "INSERT INTO Post (userID, title, type, content, dateCreated) VALUES ('" +
    userID +
    "', '" +
    title +
    "', 'text', '" +
    content +
    "', '" +
    date +
    "');";
  connection.query (query, function (error, result) {
    if (error) {
      console.log (error);
      endFunction ('0');
    } else {
      endFunction ('1');
    }
  });
}

function addPostImage (userID, title, contentURL, caption, endFunction) {
  var date = new Date ();
  var query =
    "INSERT INTO Post (userID, title, type, contentURL, caption, dateCreated) VALUES ('" +
    userID +
    "', '" +
    title +
    "', 'text', '" +
    contentURL +
    "', '" +
    caption +
    "', '" +
    date +
    "');";
  connection.query (query, function (error, result) {
    if (error) {
      console.log (error);
      endFunction ('0');
    } else {
      endFunction ('1');
    }
  });
}

/*----------------------AJAX---------------------------*/
app.use ('/', router);


// posts for stream
router.get ('/getHome', function (req, res) {
  console.log ('/getHome');
  getTop20Posts (function (output) {
    console.log ('Server sending posts for stream');
    //console.log(output);
    res.send (output);
  });
});

//posts for trending
router.get ('/getTrending', function (req, res) {
  console.log ('/getTrending');
  getTop5Posts (function (output) {
    console.log ('Server sending posts for stream');
    //console.log(output);
    res.send (output);
  });
});

router.post ('/newUser', function (req, res) {
  console.log ('/newUser');
  newUser (
    req.body.email,
    req.body.username,
    req.body.password,
    req.body.firstName,
    req.body.lastName,
    req.body.city,
    req.body.state,
    req.body.DOB,
    req.body.pfpURL,
    function (user, id) {
      req.session.username = user;
      req.session.uid = id;
    },
    function (output) {
      res.send (output);
    }
  );
});

router.post ('/verifyUser', function (req, res) {
  console.log ('/verifyUser');
  verifyUser (
    req.body.username,
    req.body.password,
    function (user, id) {
      req.session.username = user;
      req.session.uid = id;
    },
    function (output) {
      res.send (output);
    }
  );
});

router.get ('/checkLogin', function (req, res) {
  console.log ('/checkLogin');
  if (req.session.username) {
    res.send ('[{"username":"' + req.session.username + '"}]');
  } else {
    res.send ('[]');
  }
});

router.post ('/logout', function (req, res) {
  console.log ('/logout');
  req.session.destroy ();
  res.end ();
});

router.post ('/newPostText', function (req, res) {
  console.log ('/newPostText');
  if (!req.session.uid) {
    console.log ('no uid');
    res.end ('0');
  } else {
    addPostText (req.session.uid, req.body.title, req.body.content, function (
      output
    ) {
      res.send (output);
    });
  }
});

router.post ('/newPostImage', function (req, res) {
  console.log ('/newPostImage');
  if (!req.session.uid) {
    res.end ('0');
  } else {
    addPostImage (
      req.session.uid,
      req.body.title,
      req.body.contentURL,
      req.body.caption,
      function (output) {
        res.send (output);
      }
    );
  }
});

// may need modification - only searches for title so far
// localhost:3000/searchresults?search=value
// will fix later dont delete pls
/* router.get ('/searchresults', (req, res, next) => {
	console.log('search...');
  let searchTerm = req.query.search;
  if (!searchTerm) {
    // if no search term entered
    res.send (results);
  } else {
    let baseSQL =
      'SELECT * AS haystack\
        FROM posts \
        HAVING haystack like ?;';
    let sqlReadySearchTerm = '%' + searchTerm + '%'; // building proper search term
    connection
      .query(baseSQL, [sqlReadySearchTerm])
      .then (([results, fields]) => {
        if (results && results.length) {
          res.send ({
            resultsStatus: 'info',
            message: `${results.length} results found`,
            results: results,
          });
        } else {
          res.send ({
            resultsStatus: 'info',
            message: 'No results found for your search :(',
            results: results,
          });
        }
      })
      .catch (err => next (err));
  }
}); */

router.get ('/searchresults', function (req, res) {
	console.log ('/searchresults');
	let searchTerm = req.query.search;
	var query =
    'SELECT * FROM Post HAVING caption like "%' +
    searchTerm +
    '%";';
  connection.query (query, function (error, result) {
    if (error) {
      console.log (error);
    } else {
      (JSON.stringify (result));
	  res.send(result);
    }
  	});
  });



var server = app.listen(process.env.PORT || 3001)
console.log (`server online at port ${port}`);
