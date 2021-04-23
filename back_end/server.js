const mysql = require('mysql');
const path = require("path");
const session = require('express-session');
const multer = require('multer');
const express = require('express');
const cookieParser = require('cookie-parser');
var CryptoJS = require("crypto-js");
var router = express.Router();
const app = express();
const fs = require('fs');
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
var connection = false;
var port = 3001; //80;
const cors = require('cors');




if (process.env.NODE_ENV === "production") {
  app.use (express.static (path.resolve (__dirname, '../front_end/momentus/build')));
}
app.use (
  session ({secret: 'CSC648csc!', resave: false, saveUninitialized: false})
);
app.use(cors());

/*----------------------Prepare---------------------------*/

const storagePost = multer.diskStorage({
  destination: function(req, file, callback) {
    if (file.fieldname === "contentURL") {
      callback(null, path.resolve(__dirname, 'post-images'));
    } else if (file.fieldname === "pfpURL") {
      callback(null, path.resolve(__dirname, 'profile-images'));
    } else if (file.fieldname === "iconURL") {
      callback(null, path.resolve(__dirname, 'collection-images'));
    }
  },
  filename: function(req, file, callback) {
    callback(null, Date.now()+"-"+file.originalname);
  }
});
const upload = multer({storage: storagePost});

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
    //resetDatabase();
    prepareTables();
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
  var query = "SET FOREIGN_KEY_CHECKS = 0; DROP TABLE Post; DROP TABLE Users; DROP TABLE Comments; DROP TABLE Favorites; DROP TABLE Following; DROP TABLE Messages; DROP TABLE Collections; DROP TABLE Collection_Content; SET FOREIGN_KEY_CHECKS = 1;"
  connection.query(query, function (error, result) {
    if (error) {
      console.log(error);
    } 
  });
}

/*---------------------Functions----------------------------*/

function getTop20Posts(nextFunction) { 
  var postQuery = "SELECT * FROM Post";
  var matchQuery = "SELECT userID FROM Post";
  var userQuery = "SELECT userID, username, pfpURL FROM Users WHERE userID IN (" + matchQuery + ")";
  var query = postQuery + " NATURAL JOIN (" + userQuery + ") AS U LIMIT 20";
  connection.query(query, function (error, result) {
    if (error) {
      console.log(error);
    } else {
      nextFunction(JSON.stringify(result));
    }
  });
}

function getTop5Posts (nextFunction) {
  var postQuery = 'SELECT * FROM Post';
  var matchQuery = 'SELECT userID FROM Post';
  var userQuery = 'SELECT userID, username, pfpURL FROM Users WHERE userID IN ('+matchQuery+')';
  var query = postQuery + ' NATURAL JOIN (' + userQuery + ') AS U LIMIT 5';
  connection.query (query, function (error, result) {
    if (error) {
      console.log (error);
    } else {
      nextFunction (JSON.stringify (result));
    }
  });
}

function newUser(email, username, password, firstName, lastName, city, state, DOB, pfpURL, storeFunction, endFunction) { 
  var query = "INSERT INTO Users (email, username, password, firstName, lastName, city, state, DOB, pfpURL, privacy) VALUES ('"+email+"', '"+username+"', '"+encodePass(password)+"', '"+firstName+"', '"+lastName+"', '"+city+"', '"+state+"', '"+DOB+"', '"+pfpURL+"', '0');";
  connection.query(query, function (error, result) {
    if (error) {
      console.log(error);
      endFunction("0");
    } else {
      storeFunction(username, result.insertId);
      endFunction("1");
    }
  });
}

function verifyUser(username, password, storeFunction, endFunction) { 
  var encodedPass = encodePass(password);
  var query = "SELECT userID FROM Users WHERE username = \'"+username+"\' AND password = \'"+encodedPass+"\';";
  connection.query(query, function (error, result) {
    if (error) {
      console.log(error);
      endFunction("0");
    } else {
      if (result.length > 0) {
        storeFunction(username, result[0].userID);
        endFunction("1");
      } else {
        endFunction("0");
      }
    }
  });
}

function encodePass(pass) {
  var hash = CryptoJS.SHA256(pass);
  return hash.toString(CryptoJS.enc.Base64)
}

function addPostText(userID, title, content, endFunction) {
  var date = Date.now();
  var query = "INSERT INTO Post (userID, title, type, content, dateCreated) VALUES ('"+userID+"', '"+title+"', 'text', '"+content+"', '"+date+"');";
  connection.query(query, function (error, result) {
    if (error) {
      console.log(error);
      endFunction("0");
    } else {
      endFunction("1");
    }
  });
}

function addPostImage(userID, title, contentURL, caption, endFunction) {
  var date = Date.now();
  var query = "INSERT INTO Post (userID, title, type, contentURL, caption, dateCreated) VALUES ('"+userID+"', '"+title+"', 'photo', '"+contentURL+"', '"+caption+"', '"+date+"');";
  connection.query(query, function (error, result) {
    if (error) {
      console.log(error);
      endFunction("0");
    } else {
      endFunction("1");
    }
  });
}

function addMessage(sender, receiver, content, endFunction) {
  var date = Date.now();
  var query = "INSERT INTO Messages (userIDReceiver, userIDSender, content, dateCreated) VALUES ('"+receiver+"', '"+sender+"', '"+content+"', '"+date+"');";
  connection.query(query, function (error, result) {
    if (error) {
      console.log(error);
      endFunction("0");
    } else {
      endFunction("1");
    }
  });
}

function addComments(postID, userID, content, endFunction) {
  var date = Date.now();
  var query = "INSERT INTO Comments (postID, userID, content, dateCreated) VALUES ('"+postID+"', '"+userID+"', '"+content+"', '"+date+"');";
  connection.query(query, function (error, result) {
    if (error) {
      console.log(error);
      endFunction("0");
    } else {
      endFunction("1");
    }
  });
}

function follow(following, followed, endFunction) {
  var date = Date.now();
  var query = "INSERT INTO Comments (userIDFollowing, userIDFollowed, dateFollowed) VALUES ('"+following+"', '"+followed+"', '"+date+"');";
  connection.query(query, function (error, result) {
    if (error) {
      console.log(error);
      endFunction("0");
    } else {
      endFunction("1");
    }
  });
}

function favorite(postID, userID, endFunction) {
  var date = Date.now();
  var query = "INSERT INTO Comments (postID, userID, dateCreated) VALUES ('"+postID+"', '"+userID+"', '"+date+"');";
  connection.query(query, function (error, result) {
    if (error) {
      console.log(error);
      endFunction("0");
    } else {
      endFunction("1");
    }
  });
}

function newCollection(userID, name, iconURL, endFunction) {
  var date = Date.now();
  var query = "INSERT INTO Collections (userID, name, iconURL, dateCreated, lastUpdated) VALUES ('"+userID+"', '"+name+"', '"+iconURL+"', '"+date+"', '"+date+"');";
  connection.query(query, function (error, result) {
    if (error) {
      console.log(error);
      endFunction("0");
    } else {
      endFunction("1");
    }
  });
}

function appendCollection(postID, collectionID, endFunction) {
  var date = Date.now();
  var query = "INSERT INTO Collection_Content (postID, collectionID, dateAdded) VALUES ('"+postID+"', '"+collectionID+"', '"+date+"');";
  connection.query(query, function (error, result) {
    if (error) {
      console.log(error);
      endFunction("0");
    } else {
      endFunction("1");
    }
  });
}

function getCollections(collectionID, nextFunction) {
  var query = "SELECT * FROM Collections WHERE userID = '"+collectionID+"';";
  connection.query (query, function (error, result) {
    if (error) {
      console.log (error);
    } else {
      nextFunction (JSON.stringify (result));
    }
  });
}

function viewCollection(collectionID, nextFunction) {
  var query = "SELECT * FROM Post NATURAL JOIN (SELECT * FROM Collection_Content WHERE collectionID = '"+collectionID+"');";
  connection.query (query, function (error, result) {
    if (error) {
      console.log (error);
    } else {
      nextFunction (JSON.stringify (result));
    }
  });
}

/*----------------------AJAX---------------------------*/

router.get('/', function (req, res) {
  res.sendFile(path.resolve(__dirname, '../front') + '/index.html');
});

router.get('/getHome', function (req, res) {
  console.log("/getHome");
  getTop20Posts(function(output) {
    console.log ('Server sending posts for stream');
    res.send(output);
  });
});

router.get ('/getTrending', function (req, res) {
  console.log ('/getTrending');
  getTop5Posts (function (output) {
    console.log ('Server sending posts for stream');
    res.send (output);
  });
});

router.post('/newUser', upload.single("pfpURL"), function (req, res) {
  console.log("/newUser");
  var filePath = "../back_end/profile-images/"+Date.now()+"-"+req.file.originalname;
  console.log("> "+filePath);
  newUser(req.body.email, req.body.username, req.body.password, req.body.firstName, req.body.lastName, req.body.city, req.body.state, req.body.DOB, filePath, function(user, id) {
    req.session.username = user;
    req.session.uid = id;
  }, function(output) {
    res.send(output);
  }); 
});

router.post('/verifyUser', function (req, res) {
  console.log("/verifyUser");
  verifyUser(req.body.username, req.body.password, function(user, id) {
    req.session.username = user;
    req.session.uid = id;
  }, function(output) {
    res.send(output);
  });  
});

router.get('/checkLogin', function (req, res) {
  console.log("/checkLogin");
  if (req.session.username) {
    res.send("[{\"username\":\""+req.session.username+"\"}]");
  } else {
    res.send("[]");
  }
});

router.post('/logout', function (req, res) {
  console.log("/logout");
  req.session.destroy();
  res.end();
});

router.post('/newPostText', function (req, res) {
  console.log("/newPostText");
  if (!req.session.uid) {
    console.log("no uid");
    res.end("0");
  } else {
    addPostText(req.session.uid, req.body.title, req.body.content, function(output) {
      res.send(output);
    });  
  }
});

router.post('/newPostImage', upload.single("contentURL"), function (req, res) {
  console.log("/newPostImage");
  if (!req.session.uid) {
    res.end("0");
  } else {
    var filePath = "../back_end/post-images/"+Date.now()+"-"+req.file.originalname;
    console.log("> "+filePath);
    addPostImage(req.session.uid, req.body.title, filePath, req.body.caption, function(output) {
      res.send(output);
    }); 
  }
});

router.post('/sendMessage', function (req, res) {
  console.log("/sendMessage");
  if (!req.session.uid) {
    res.end("0");
  } else {
    //socket.io for messaging service
    addMessage(req.session.uid, req.body.receiver, req.body.content, function(output) {
      res.send(output);
    }); 
  }
});

router.post('/addComment', function (req, res) {
  console.log("/sendMessage");
  if (!req.session.uid) {
    res.end("0");
  } else {
    addMessage(req.body.postID, req.session.uid, req.body.content, function(output) {
      res.send(output);
    }); 
  }
});

router.post('/follow', function (req, res) {
  console.log("/follow");
  if (!req.session.uid) {
    res.end("0");
  } else {
    follow(req.session.uid, req.body.followed, function(output) {
      res.send(output);
    }); 
  }
});

router.post('/favorite', function (req, res) {
  console.log("/favorite");
  if (!req.session.uid) {
    res.end("0");
  } else {
    favorite(req.body.postID, req.session.uid, function(output) {
      res.send(output);
    }); 
  }
});

router.post('/newCollection', upload.single("iconURL"), function (req, res) {
  console.log("/newCollection");
  if (!req.session.uid) {
    res.end("0");
  } else {
    var filePath = "../back/collection-images/"+Date.now()+"-"+req.file.originalname;
    console.log(">"+filePath);
    newCollection(req.session.uid, req.body.name, filePath, function(output) {
      res.send(output);
    }); 
  }
});

router.post('/appendCollection', function (req, res) {
  console.log("/appendCollection");
  if (!req.session.uid) {
    res.end("0");
  } else {
    appendCollection(req.body.postID, req.body.collectionID, function(output) {
      res.send(output);
    }); 
  }
});

router.post('/getCollections', function (req, res) {
  console.log("/getCollections");
  if (!req.session.uid) {
    res.end("0");
  } else {
    if (req.body.userID === "self") {
      getCollections(req.session.uid, function(output) {
        res.send(output);
      }); 
    } else {
      getCollections(req.body.userID, function(output) {
        res.send(output);
      }); 
    }
  }
});

router.post('/viewCollection', function (req, res) {
  console.log("/viewCollection");
  if (!req.session.uid) {
    res.end("0");
  } else {
    viewCollection(req.body.collectionID, function(output) {
      res.send(output);
    }); 
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

router.get ('/search', function (req, res) {
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

router.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, '../front_end/momentus/build/index.html'), function(err) {
      if (err) {
        res.status(500).send(err)
      }
    })
  })


app.use("/", router);
var server = app.listen(process.env.PORT || 3001)
console.log("> server online\n> listening port "+port+"\n");


