const mysql = require('mysql');
const path = require("path");
const session = require('express-session');
const multer = require('multer');
const express = require('express');
const cookieParser = require('cookie-parser');
const CryptoJS = require("crypto-js");
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
		resetDatabase();
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
	preparation = fs.readFileSync(__dirname + "/prefillDB.sql").toString();
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

function encodePass(pass) {
	var hash = CryptoJS.SHA256(pass);
	return hash.toString(CryptoJS.enc.Base64)
}

/*----------------------AJAX---------------------------*/

/*----------------------HOME---------------------------*/

router.get('/', function (req, res) {
	res.sendFile(path.resolve(__dirname, '../front') + '/index.html');
});

router.get('/getHome', function (req, res) {
	console.log("/getHome");
	var query = "SELECT Post.postID, Post.userID, Post.title, Post.caption, Post.type, Post.contentURL, Post.content, Post.dateCreated, Users.username, Users.pfpURL, Comments.comment, Comments.dateCommented, Comments.cuID, A.numFav FROM Post LEFT JOIN Users ON Users.userID = Post.userID LEFT JOIN Comments ON Comments.postID = Post.postID LEFT JOIN (SELECT postID, COUNT(*) AS numFav FROM Favorites GROUP BY Favorites.postID) AS A ON A.postID = Post.postID ORDER BY Post.dateCreated DESC LIMIT 20;";
	connection.query(query, function (error, result) {
		if (error) {
			console.log(error);
			res.send("0");
		} else {
			res.send(JSON.stringify(result));
		}
	});
});

router.get('/getTrending', function (req, res) {
	console.log ('/getTrending');
	var date = new Date();
	date.setDate(date.getDate() - 7);
	var time = date.getTime();
	var query = "SELECT Post.postID, Post.userID, Post.title, Post.caption, Post.type, Post.contentURL, Post.content, Post.dateCreated, Users.username, Users.pfpURL, Comments.comment, Comments.dateCommented, Comments.cuID, A.numFav FROM Post LEFT JOIN Users ON Users.userID = Post.userID LEFT JOIN Comments ON Comments.postID = Post.postID LEFT JOIN (SELECT postID, COUNT(*) AS numFav FROM Favorites GROUP BY Favorites.postID) AS A ON A.postID = Post.postID WHERE Post.dateCreated > "+time+" ORDER BY numFav DESC LIMIT 10;";
	connection.query (query, function (error, result) {
		if (error) {
			console.log (error);
			res.send("0");
		} else {
			res.send(JSON.stringify (result));
		}
	});
});

/*----------------------PROFILE---------------------------*/
// OLD VERSION:
// router.post('/newUser', upload.single("pfpURL"), function (req, res) {
router.post('/newUser', function (req, res) {
	console.log("/newUser");
	// we will possibly reimplement this later, for now we will use a placeholder
	/* var filePath = "../back_end/profile-images/"+Date.now()+"-"+req.file.originalname;
	console.log("> "+filePath); */
	var filePath = "http://mattrbolles.com/bluecircle.png"
	var query = "INSERT INTO Users (email, username, password, firstName, lastName, city, state, DOB, pfpURL, privacy) VALUES ('"+req.body.email+"', '"+req.body.username+"', '"+req.body.password+"', '"+req.body.firstName+"', '"+req.body.lastName+"', '"+req.body.city+"', '"+req.body.state+"', '"+req.body.DOB+"', '"+filePath+"', '0');";
	connection.query(query, function (error, result) {
		if (error) {
			console.log(error);
			res.send("0");
		} else {
			req.session.username = req.body.username;
			req.session.uid = result.insertId;
			res.send("1");
		}
	});
});

router.post('/testRegister', function (req, res) {
	console.log("/testRegister");
	var query = "INSERT INTO Users (email, username, password, firstName, lastName, city, state, DOB, privacy) VALUES ('"+req.body.email+"', '"+req.body.username+"', '"+encodePass(req.body.password)+"', '"+req.body.firstName+"', '"+req.body.lastName+"', '"+req.body.city+"', '"+req.body.state+"', '"+req.body.DOB+"', '0');";
	connection.query(query, function (error, result) {
		if (error) {
			console.log(error);
			res.send("0");
		} else {
			req.session.username = req.body.username;
			req.session.uid = result.insertId;
			res.send("1");
		}
	});
});

router.post('/verifyUser', function (req, res) {
	console.log("/verifyUser");
	console.log(req.body);
	console.log(req.body.username);
	console.log(req.body.password);
	var encodedPass = encodePass(req.body.password);
	var query = "SELECT userID FROM Users WHERE username = \'"+req.body.username+"\' AND password = \'"+req.body.password+"\';";
	connection.query(query, function (error, result) {
		if (error) {
			console.log(error);
			res.send("error in /verifyUser");
		} else {
			if (result.length > 0) {
				req.session.username = req.body.username;
				req.session.uid = result[0].userID;
				let userID = {_id: result[0].userID}
				console.log(userID)
				res.send(userID);
	  		} else {
				res.send("error in /verifyUser");
			}
		}
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

router.get('/getProfile', function (req, res) {
	console.log("/getProfile");
	var uid = 0;
	if (req.query.userID === "self") {
		uid = req.session.uid;
	} else {
		uid = req.query.userID;
	}
	var query = "SELECT * FROM Users WHERE userID = "+uid+";";
	connection.query (query, function (error, result) {
		if (error) {
			console.log (error);
			res.send("0");
		} else {
			res.send(JSON.stringify (result));
		}
	});
});

router.post('/changePrivacy', function (req, res) {
	console.log("/changePrivacy");
	if (!req.session.uid) {
		res.end("0");
	} else {
		var query = "UPDATE Users SET privacy='"+req.body.privacy+"' WHERE userID="+req.session.uid+";";
		connection.query(query, function (error, result) {
			if (error) {
				console.log(error);
				res.send("0");
			} else {
				res.send("1");
			}
		}); 
	}
});

/*----------------------POSTS---------------------------*/

router.post('/newPostText', function (req, res) {
	console.log("/newPostText");
	var uid = 1
	if (!req.session.uid) {
		console.log("no uid");
	} else {
		uid = req.session.uid;
	}
	var date = new Date();
	var time = date.getTime();
	var query = "INSERT INTO Post (userID, title, type, content, dateCreated) VALUES ('"+uid+"', '"+req.body.title+"', 'text', '"+req.body.content+"', '"+time+"');";
	connection.query(query, function (error, result) {
		if (error) {
			console.log(error);
			res.send("0");
		} else {
			res.json({id: result.insertId});
		}
	});
});
/*
router.post('/testNewPostText', function (req, res) {
	console.log("/testNewPostText");
	var date = new Date();
	var time = date.getTime();
	var query = "INSERT INTO Post (userID, title, type, content, dateCreated) VALUES ('"+1+"', '"+req.body.title+"', 'text', '"+req.body.content+"', '"+time+"');";
	connection.query(query, function (error, result) {
		if (error) {
			console.log(error);
			res.send("0");
		} else {
			res.send("1");
		}
	});
});*/

router.post('/newPostImage', upload.single("contentURL"), function (req, res) {
	console.log("/newPostImage");
	if (!req.session.uid) {
		console.log("no uid");
		res.end("0");
	} else {
		var filePath = "../back_end/post-images/"+Date.now()+"-"+req.file.originalname;
		console.log("> "+filePath);
		var date = new Date();
		var time = date.getTime();
		var query = "INSERT INTO Post (userID, title, type, contentURL, caption, dateCreated) VALUES ('"+req.session.uid+"', '"+req.body.title+"', 'photo', '"+filePath+"', '"+req.body.caption+"', '"+time+"');";
		connection.query(query, function (error, result) {
			if (error) {
				console.log(error);
				res.send("0");
			} else {
				res.send("1");
			}
		});
	}
});

router.post('/testNewPostImage', function (req, res) {
	console.log("/testNewPostImage");
	var date = new Date();
	var time = date.getTime();
	var query = "INSERT INTO Post (userID, title, type, caption, dateCreated) VALUES ('"+1+"', '"+req.body.title+"', 'photo', '"+req.body.caption+"', '"+time+"');";
	connection.query(query, function (error, result) {
		if (error) {
			console.log(error);
			res.send("0");
		} else {
			res.send("1");
		}
	});
});

router.post('/getPosts', function (req, res) {
	console.log("/getPosts");
	var uid = 0;
	if (req.body.userID === "self") {
		uid = req.session.uid;
	} else {
		uid = req.body.userID;
	}
	var query = "SELECT Post.postID, Post.userID, Post.title, Post.caption, Post.type, Post.contentURL, Post.content, Post.dateCreated, Users.username, Users.pfpURL, Comments.comment, Comments.dateCommented, Comments.cuID, A.numFav FROM Post LEFT JOIN Users ON Users.userID = Post.userID LEFT JOIN Comments ON Comments.postID = Post.postID LEFT JOIN (SELECT postID, COUNT(*) AS numFav FROM Favorites GROUP BY Favorites.postID) AS A ON A.postID = Post.postID WHERE Post.userID = "+uid+" ORDER BY Post.dateCreated DESC LIMIT 50;";
	connection.query (query, function (error, result) {
		if (error) {
			console.log (error);
			res.send("0");
		} else {
			res.send(JSON.stringify (result));
		}
	});
});

router.post('/getPostsFollow', function (req, res) {
	console.log("/getPostsFollow");
	var uid = 0;
	if (req.body.userID === "self") {
		uid = req.session.uid;
	} else {
		uid = req.body.userID;
	}
	var query = "SELECT Post.postID, Post.userID, Post.title, Post.caption, Post.type, Post.contentURL, Post.content, Post.dateCreated, Users.username, Users.pfpURL, Comments.comment, Comments.dateCommented, Comments.cuID, A.numFav FROM Post LEFT JOIN Users ON Users.userID = Post.userID LEFT JOIN Comments ON Comments.postID = Post.postID LEFT JOIN (SELECT postID, COUNT(*) AS numFav FROM Favorites GROUP BY Favorites.postID) AS A ON A.postID = Post.postID WHERE Post.userID IN (SELECT userIDFollowed FROM Following WHERE userIDFollowing = "+uid+") ORDER BY Post.dateCreated DESC LIMIT 50;";
	connection.query (query, function (error, result) {
		if (error) {
			console.log (error);
			res.send("0");
		} else {
			res.send(JSON.stringify (result));
		}
	});
});

router.post('/getPostByID', function (req, res) {
	console.log("/getPostByID");
	var query = "SELECT Post.postID, Post.userID, Post.title, Post.caption, Post.type, Post.contentURL, Post.content, Post.dateCreated, Users.username, Users.pfpURL, Comments.comment, Comments.dateCommented, Comments.cuID, A.numFav FROM Post LEFT JOIN Users ON Users.userID = Post.userID LEFT JOIN Comments ON Comments.postID = Post.postID LEFT JOIN (SELECT postID, COUNT(*) AS numFav FROM Favorites GROUP BY Favorites.postID) AS A ON A.postID = Post.postID WHERE Post.postID = "+req.query.postID+";";
	connection.query (query, function (error, result) {
		if (error) {
			console.log (error);
			res.send("0");
		} else {
			res.json(result);
		}
	});
});

/*----------------------MESSAGE---------------------------*/

router.post('/sendMessage', function (req, res) {
	console.log("/sendMessage");
	var uid = 0;
	if (!req.session.uid) {
		uid = req.body.uid
	} else {
		uid = req.session.uid
	}
		//socket.io for messaging service
	var date = new Date();
	var time = date.getTime();
	var query = "INSERT INTO Messages (userIDReceiver, userIDSender, content, dateSent) VALUES ('"+req.body.receiver+"', '"+uid+"', '"+req.body.content+"', '"+time+"');";
	connection.query(query, function (error, result) {
		if (error) {
			console.log(error);
			res.send("0");
		} else {
			res.send("1");
		}
	});
});

router.post('/getMessage', function (req, res) {
	console.log("/getMessage");
	var query = "SELECT * FROM Messages WHERE userIDReceiver = "+req.session.uid+" OR userIDSender = "+req.session.uid+" OR userIDSender = "+req.body.userID+" OR userIDReceiver = "+req.body.userID+" ORDER BY dateSent DESC LIMIT 50;";
	connection.query (query, function (error, result) {
		if (error) {
			console.log (error);
			res.send("0");
		} else {
			res.send(JSON.stringify (result));
		}
	});
});

/*----------------------COMMENT---------------------------*/

router.post('/addComment', function (req, res) {
	console.log("/addComment");
	var uid = 0;
	if (!req.session.uid) {
		uid = req.body.uid
	} else {
		uid = req.session.uid
	}
	var date = new Date();
	var time = date.getTime();
	var query = "INSERT INTO Comments (postID, cuID, comment, dateCommented) VALUES ('"+req.body.postID+"', '"+uid+"', '"+req.body.content+"', '"+time+"');";
	connection.query(query, function (error, result) {
		if (error) {
			console.log(error);
			res.send("0");
		} else {
			res.json({id: result.insertId});
		}
	});
});

router.post('/getComments', function (req, res) {
	console.log("/getComments");
	var uid = 0;
	if (req.body.userID === "self") {
		uid = req.session.uid;
	} else {
		uid = req.body.userID;
	}
	var query = "SELECT * FROM Comments WHERE cuID = "+uid+";";
	connection.query (query, function (error, result) {
		if (error) {
			console.log (error);
			res.send("0");
		} else {
			res.send(JSON.stringify (result));
		}
	});
});

/*----------------------FOLLOW---------------------------*/

router.post('/follow', function (req, res) {
	console.log("/follow");
	var uid = 0;
	if (req.body.userID === "self") {
		uid = req.session.uid;
	} else {
		uid = req.body.userID;
	}
	var date = new Date();
	var time = date.getTime();
	var query = "INSERT INTO Following (userIDFollowing, userIDFollowed, dateFollowed) VALUES ('"+uid+"', '"+req.body.followed+"', '"+time+"');";
	connection.query(query, function (error, result) {
		if (error) {
			console.log(error);
			res.send("0");
		} else {
			res.send("1");
		}
	});
});

router.post('/getFollow', function (req, res) {
	console.log("/getFollow");
	var uid = 0;
	if (req.body.userID === "self") {
		uid = req.session.uid;
	} else {
		uid = req.body.userID;
	}
	var query = "SELECT * FROM Following WHERE userIDFollowing = "+uid+";";
	connection.query (query, function (error, result) {
		if (error) {
			console.log (error);
			res.send("0");
		} else {
			res.send(JSON.stringify (result));
		}
	});
});

/*----------------------FAVORITE---------------------------*/

router.post('/favorite', function (req, res) {
	console.log("/favorite");
	if (!req.session.uid) {
		res.end("0");
	} else {
		var date = new Date();
		var time = date.getTime();
		var query = "INSERT INTO Favorites (postID, dateFavorite) VALUES ('"+req.body.postID+"', '"+time+"');";
		connection.query(query, function (error, result) {
			if (error) {
				console.log(error);
				res.send("0");
			} else {
				res.send("1");
			}
		});
	}
});

router.post('/getFavorite', function (req, res) {
	console.log("/getFavorite");
	var query = "SELECT * FROM Favorites WHERE postID = "+req.body.postID+";";
	connection.query (query, function (error, result) {
		if (error) {
			console.log (error);
			res.send("0");
		} else {
			res.send(JSON.stringify (result));
		}
	});
});

/*----------------------COLLECTIONS---------------------------*/

router.post('/newCollection', upload.single("iconURL"), function (req, res) {
	console.log("/newCollection");
	if (!req.session.uid) {
		res.end("0");
	} else {
		var filePath = "../back/collection-images/"+Date.now()+"-"+req.file.originalname;
		console.log(">"+filePath);
		var date = new Date();
		var time = date.getTime();
		var query = "INSERT INTO Collections (userID, name, iconURL, dateCreated, lastUpdated) VALUES ('"+req.session.uid+"', '"+req.body.name+"', '"+filePath+"', '"+time+"', '"+time+"');";
		connection.query(query, function (error, result) {
			if (error) {
				console.log(error);
				res.send("0");
			} else {
				res.send("1");
			}
		});
	}
});

router.post('/appendCollection', function (req, res) {
	console.log("/appendCollection");
	if (!req.session.uid) {
		res.end("0");
	} else {
		var date = new Date();
		var time = date.getTime();
		var query = "INSERT INTO Collection_Content (postID, collectionID, dateAdded) VALUES ('"+req.body.postID+"', '"+req.body.collectionID+"', '"+time+"');";
		connection.query(query, function (error, result) {
			if (error) {
				console.log(error);
				res.send("0");
			} else {
				res.send("1");
			}
		});
	}
});

router.post('/getCollections', function (req, res) {
	console.log("/getCollections");
	console.log(req.query)
	// pass in session to verify, add back in later
	/* if (!req.session.uid) {
		res.end("0");
	} else { */
		var uid = 0;
		if (req.query.userID === "self") {
			uid = req.session.uid;
		} else {
			uid = req.query.userID;
		}
		console.log("getting collections")
		var query = "SELECT * FROM Collections WHERE userID = "+uid+";";
		connection.query (query, function (error, result) {
			if (error) {
				console.log (error);
			} else {
				res.send (JSON.stringify (result));
			}
		});
	}
);

router.post('/viewCollection', function (req, res) {
	console.log("/viewCollection");
	if (!req.session.uid) {
		res.end("0");
	} else {
		var query = "SELECT * FROM Post NATURAL JOIN (SELECT * FROM Collection_Content WHERE collectionID = "+req.body.collectionID+");";
		connection.query (query, function (error, result) {
			if (error) {
				console.log (error);
			} else {
				res.send(JSON.stringify (result));
			}
		});
	}
});

router.get ('/search', function (req, res) {
	console.log ('/searchresults');
	let searchTerm = req.query.search;
	var query ='SELECT * FROM Post HAVING caption like "%' +searchTerm +'%";';
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