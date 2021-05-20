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
			callback(null, path.resolve(__dirname, '../front_end/momentus/public/images/post-images'));
		} else if (file.fieldname === "pfpURL") {
			callback(null, path.resolve(__dirname, '../front_end/momentus/public/images/profile-images'));
		} else if (file.fieldname === "iconURL") {
			callback(null, path.resolve(__dirname, '../front_end/momentus/public/images/collection-images'));
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
	var query = "SET FOREIGN_KEY_CHECKS = 0; DROP TABLE Post; DROP TABLE Users; DROP TABLE Comments; DROP TABLE Favorites; DROP TABLE Follow; DROP TABLE Messages; DROP TABLE Collections; DROP TABLE Collection_Content; SET FOREIGN_KEY_CHECKS = 1;"
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
	var query = "SELECT Post.postID, Post.userID, Post.title, Post.caption, Post.type, Post.contentURL, Post.content, Post.dateCreated, Users.username, Users.pfpURL, A.numFav FROM Post LEFT JOIN Users ON Users.userID = Post.userID LEFT JOIN (SELECT postID, COUNT(*) AS numFav FROM Favorites GROUP BY Favorites.postID) AS A ON A.postID = Post.postID ORDER BY Post.dateCreated DESC LIMIT 50;";
	connection.query(query, function (error, result) {
		if (error) {
			console.log(error);
			res.send("0");
		} else {
			query = "SELECT * FROM Comments WHERE Comments.postID IN (SELECT Post.postID From Post ORDER BY Post.dateCreated DESC) ORDER BY Comments.postID, Comments.dateCommented DESC;";
			connection.query (query, async function (error, result2) {
				if (error) {
					console.log (error);
					res.send("0");
				} else {
					await result.forEach((item) => {
						item["comments"] = [];
					})
					await result2.forEach((item, index) => {
						for (var i = result.length - 1; i >= 0; i--) {
							if (item.postID == result[i]["postID"]) {
								result[i]["comments"].push(item);
								break;
							}
						}
					})
					res.json(result);
				}
			});
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
router.post('/newUser', upload.single("pfpURL"), function (req, res) {
	console.log("/newUser");
	var filePath = "0";
	if (req.file) {
		filePath = "/front_end/momentus/public/images/profile-images"+Date.now()+"-"+req.file.originalname;
	} else {
		filePath = req.body.pfpURL;
	}
	console.log("> "+filePath); 
	var filePath = "http://mattrbolles.com/bluecircle.png"
	var query = "INSERT INTO Users (email, username, password, firstName, lastName, city, state, DOB, pfpURL, privacy) VALUES ('"+req.body.email+"', '"+req.body.username+"', '"+encodePass(req.body.password)+"', '"+req.body.firstName+"', '"+req.body.lastName+"', '"+req.body.city+"', '"+req.body.state+"', '"+req.body.DOB+"', '"+filePath+"', '0');";
	connection.query(query, function (error, result) {
		if (error) {
			console.log(error);
			res.send("0");
		} else {
			req.session.username = req.body.username;
			req.session.uid = result.insertId;
			res.json({id: result.insertId});
		}
	});
});

router.post('/verifyUser', function (req, res) {
	console.log("/verifyUser");
	console.log(req.body);
	console.log(req.body.username);
	console.log(req.body.password);
	var encodedPass = encodePass(req.body.password);
	var query = "SELECT userID FROM Users WHERE username = \'"+req.body.username+"\' AND password = \'"+encodedPass+"\';";
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
				res.json(result);
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
		uid = req.query.userID;
	var query = "SELECT * FROM Users WHERE userID = "+uid+";";
	connection.query (query, function (error, result) {
		if (error) {
			console.log (error);
			res.send("0");
		} else {
			res.json(result);
		}
	});
});

router.get('post/getProfile', function (req, res) {
	console.log("/getProfile");
	var uid = 0;
		uid = req.query.userID;
	var query = "SELECT * FROM Users WHERE userID = "+uid+";";
	connection.query (query, function (error, result) {
		if (error) {
			console.log (error);
			res.send("0");
		} else {
			res.json(result);
		}
	});
});

router.post('/changePrivacy', function (req, res) {
	console.log("/changePrivacy");
	var uid = 0;
	if (!req.session.uid) {
		uid = req.body.uid
	} else {
		uid = req.session.uid
	}
	var query = "UPDATE Users SET privacy='"+req.body.privacy+"' WHERE userID="+uid+";";
	connection.query(query, function (error, result) {
		if (error) {
			console.log(error);
			res.send("0");
		} else {
			res.send("1");
		}
	}); 
});

/*----------------------POSTS---------------------------*/

router.post('/newPostText', function (req, res) {
	console.log("/newPostText");
	var uid = 0;
	if (!req.session.uid) {
		uid = req.body.uid
	} else {
		uid = req.session.uid
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

router.post('/newPostImage', upload.single("contentURL"), function (req, res) {
	console.log("/newPostImage");
	console.log(req.body)
	console.log(JSON.stringify(req.file))
	console.log(req.file.filename);
	var uid = 0;
	if (!req.session.uid) {
		uid = req.body.uid
	} else {
		uid = req.session.uid
	}
	var filePath = "0";
	if (req.file) {
		filePath = "/images/post-images/"+req.file.filename;
	} else {
		filePath = req.body.contentURL;
	}
	console.log("> "+filePath);
	var date = new Date();
	var time = date.getTime();
	var query = "INSERT INTO Post (userID, title, type, contentURL, caption, dateCreated) VALUES ('"+uid+"', '"+req.body.title+"', 'photo', '"+filePath+"', '"+req.body.caption+"', '"+time+"');";
	console.log(query);
	connection.query(query, function (error, result) {
		if (error) {
			console.log(error);
			res.send("0");
		} else {
			res.json({id: result.insertId});
		}
	});
});

router.post('/getPosts', function (req, res) {
	console.log("/getPosts");
	var uid = 0;
	/* if (req.body.userID == "self") {
		if (!req.session.uid) {
			uid = req.body.uid
		} else {
			uid = req.session.uid
		}
	} else {
		uid = req.body.userID;
	} */
	uid = req.query.userID;
	var query = "SELECT Post.postID, Post.userID, Post.title, Post.caption, Post.type, Post.contentURL, Post.content, Post.dateCreated, Users.username, Users.pfpURL, A.numFav FROM Post LEFT JOIN Users ON Users.userID = Post.userID LEFT JOIN (SELECT postID, COUNT(*) AS numFav FROM Favorites GROUP BY Favorites.postID) AS A ON A.postID = Post.postID WHERE Post.userID = "+uid+" ORDER BY Post.dateCreated DESC LIMIT 50;";
	connection.query (query, function (error, result) {
		if (error) {
			console.log (error);
			res.send("0");
		} else {
			query = "SELECT * FROM Comments WHERE Comments.postID IN (SELECT Post.postID From Post WHERE Post.userID = "+uid+") ORDER BY Comments.postID, Comments.dateCommented DESC;";
			connection.query (query, async function (error, result2) {
				if (error) {
					console.log (error);
					res.send("0");
				} else {
					await result.forEach((item) => {
						item["comments"] = [];
					})
					await result2.forEach((item, index) => {
						for (var i = result.length - 1; i >= 0; i--) {
							if (item.postID == result[i]["postID"]) {
								result[i]["comments"].push(item);
								break;
							}
						}
					})
					res.json(result);
				}
			});
		}
	});
});

router.post('/getPostsFollow', function (req, res) {
	console.log("/getPostsFollow");
	var uid = 0;
	if (req.body.userID == "self") {
		if (!req.session.uid) {
			uid = req.body.uid
		} else {
			uid = req.session.uid
		}
	} else {
		uid = req.body.userID;
	}
	var query = "SELECT Post.postID, Post.userID, Post.title, Post.caption, Post.type, Post.contentURL, Post.content, Post.dateCreated, Users.username, Users.pfpURL, A.numFav FROM Post LEFT JOIN Users ON Users.userID = Post.userID LEFT JOIN (SELECT postID, COUNT(*) AS numFav FROM Favorites GROUP BY Favorites.postID) AS A ON A.postID = Post.postID WHERE Post.userID IN (SELECT userIDFollowed FROM Following WHERE userIDFollowing = "+uid+") ORDER BY Post.dateCreated DESC LIMIT 50;";
	connection.query (query, function (error, result) {
		if (error) {
			console.log (error);
			res.send("0");
		} else {
			query = "SELECT * FROM Comments WHERE Comments.postID IN (SELECT Post.postID From Post WHERE Post.userID IN (SELECT userIDFollowed FROM Following WHERE userIDFollowing = "+uid+") ORDER BY Post.dateCreated DESC) ORDER BY Comments.postID, Comments.dateCommented DESC;";
			connection.query (query, async function (error, result2) {
				if (error) {
					console.log (error);
					res.send("0");
				} else {
					await result.forEach((item) => {
						item["comments"] = [];
					})
					await result2.forEach((item, index) => {
						for (var i = result.length - 1; i >= 0; i--) {
							if (item.postID == result[i]["postID"]) {
								result[i]["comments"].push(item);
								break;
							}
						}
					})
					res.json(result);
				}
			});
		}
	});
});

router.get('/getAllPostFavorite', function (req, res) {
	console.log("/getAllPostFavorite");
	var uid = 0;
	if (!req.session.uid) {
		uid = req.query.uid
	} else {
		uid = req.session.uid
	}
	var query = "SELECT Post.postID, Post.userID, Post.title, Post.caption, Post.type, Post.contentURL, Post.content, Post.dateCreated, Users.username, Users.pfpURL, A.numFav FROM Post LEFT JOIN Users ON Users.userID = Post.userID LEFT JOIN (SELECT postID, COUNT(*) AS numFav FROM Favorites GROUP BY Favorites.postID) AS A ON A.postID = Post.postID WHERE Post.postID IN (SELECT Favorites.postID FROM Favorites WHERE fuID = "+uid+") ORDER BY Post.dateCreated DESC LIMIT 50;";
	connection.query (query, function (error, result) {
		if (error) {
			console.log (error);
			res.send("0");
		} else {
			query = "SELECT * FROM Comments WHERE Comments.postID IN (SELECT Post.postID From Post WHERE Post.postID IN (SELECT Favorites.postID FROM Favorites WHERE fuID = "+uid+") ORDER BY Post.dateCreated) ORDER BY Comments.postID, Comments.dateCommented DESC;";
			connection.query (query, async function (error, result2) {
				if (error) {
					console.log (error);
					res.send("0");
				} else {
					await result.forEach((item) => {
						item["comments"] = [];
					})
					await result2.forEach((item, index) => {
						for (var i = result.length - 1; i >= 0; i--) {
							if (item.postID == result[i]["postID"]) {
								result[i]["comments"].push(item);
								break;
							}
						}
					})
					res.json(result);
				}
			});
		}
	});
});

router.post('/getPostByID', function (req, res) {
	console.log("/getPostByID");
	var query = "SELECT Post.postID, Post.userID, Post.title, Post.caption, Post.type, Post.contentURL, Post.content, Post.dateCreated, Users.username, Users.pfpURL, A.numFav FROM Post LEFT JOIN Users ON Users.userID = Post.userID LEFT JOIN (SELECT postID, COUNT(*) AS numFav FROM Favorites GROUP BY Favorites.postID) AS A ON A.postID = Post.postID WHERE Post.postID = "+req.query.postID+";";
	connection.query (query, function (error, result) {
		if (error) {
			console.log (error);
			res.send("0");
		} else {
			query = "SELECT * FROM Comments WHERE Comments.postID = "+req.query.postID+" ORDER BY Comments.dateCommented DESC;";
			connection.query (query, function (error, result2) {
				if (error) {
					console.log (error);
					res.send("0");
				} else {
					result[0]["comments"] = result2;
					res.json(result);
				}
			});
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
	var query = "INSERT INTO Comments (postID, cuID, comment, dateCommented) VALUES ('"+req.body.postID+"', '"+uid+"', '"+req.body.comment+"', '"+time+"');";
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
	if (req.body.userID == "self") {
		if (!req.session.uid) {
			uid = req.body.uid
		} else {
			uid = req.session.uid
		}
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
	if (req.body.userID == "self") {
		if (!req.session.uid) {
			uid = req.body.uid
		} else {
			uid = req.session.uid
		}
	} else {
		uid = req.body.userID;
	}
	var date = new Date();
	var time = date.getTime();
	var query = "INSERT INTO Follow (userIDFollowing, userIDFollowed, dateFollowed) VALUES ('"+uid+"', '"+req.body.followed+"', '"+time+"');";
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
	if (req.body.userID == "self") {
		if (!req.session.uid) {
			uid = req.body.uid
		} else {
			uid = req.session.uid
		}
	} else {
		uid = req.body.userID;
	}
	var query = "SELECT * FROM Follow WHERE userIDFollowing = "+uid+";";
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
	console.log(req.body)
	console.log(req.query)
	var uid = 0;
	if (!req.session.uid) {
		uid = req.query.uid
	} else {
		uid = req.session.uid
	}
	var date = new Date();
	var time = date.getTime();
	var query = "INSERT INTO Favorites (postID, fuID, dateFavorite) VALUES ('"+req.query.postID+"', '"+uid+"', '"+time+"');";
	connection.query(query, function (error, result) {
		if (error) {
			console.log(error);
			res.send("0");
		} else {
			res.json({id: req.query.postID});
		}
	});
});

router.get('/getPostFavorite', function (req, res) {
	console.log("/getPostFavorite");
	var query = "SELECT * FROM Favorites WHERE postID = "+req.query.postID+";";
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
	var uid = 0;
	if (!req.session.uid) {
		uid = req.body.uid
	} else {
		uid = req.session.uid
	}
	var filePath = "0";
	if (req.file) {
		filePath = "/front_end/momentus/public/images/collection-images"+Date.now()+"-"+req.file.originalname;
	} else {
		filePath = req.body.iconURL;
	}
	console.log(">"+filePath);
	var date = new Date();
	var time = date.getTime();
	var query = "INSERT INTO Collections (userID, name, iconURL, dateCreated, lastUpdated) VALUES ('"+uid+"', '"+req.body.name+"', '"+filePath+"', '"+time+"', '"+time+"');";
	connection.query(query, function (error, result) {
		if (error) {
			console.log(error);
			res.send("0");
		} else {
			res.json({id: result.insertId});
		}
	});
});

router.post('/appendCollection', function (req, res) {
	console.log("/appendCollection");
	var date = new Date();
	var time = date.getTime();
	var query = "INSERT INTO Collection_Content (postID, collectionID, dateAdded) VALUES ('"+req.body.postID+"', '"+req.body.collectionID+"', '"+time+"');";
	connection.query(query, function (error, result) {
		if (error) {
			console.log(error);
			res.send("0");
		} else {
			res.json({id: req.body.collectionID});
		}
	});
});

router.post('/getCollections', function (req, res) {
	console.log("/getCollections");
	console.log(req.body)
	console.log(req.query)
	var uid = 0;
	/* if (req.query.userID == "self") {
		if (!req.session.uid) {
			uid = req.query.uid
		} else {
			uid = req.session.uid
		}
	} else { */
	uid = req.query.userID;
	var query = "SELECT * FROM Collections WHERE userID = "+uid+";";
	connection.query (query, function (error, result) {
		if (error) {
			console.log (error);
		} else {
			res.send (JSON.stringify (result));
		}
	});
});

router.post('post/getCollections', function (req, res) {
	console.log("/getCollections");
	console.log(req.body)
	console.log(req.query)
	var uid = 0;
	/* if (req.query.userID == "self") {
		if (!req.session.uid) {
			uid = req.query.uid
		} else {
			uid = req.session.uid
		}
	} else { */
	uid = req.query.userID;
	var query = "SELECT * FROM Collections WHERE userID = "+uid+";";
	connection.query (query, function (error, result) {
		if (error) {
			console.log (error);
		} else {
			res.json(result);
		}
	});
});

router.post('/viewCollection', function (req, res) {
	console.log("/viewCollection");
	var query = "SELECT * FROM Post RIGHT JOIN (SELECT Collection_Content.postID AS useless, Collection_Content.dateAdded FROM Collection_Content WHERE collectionID = "+req.query.collectionID+") AS CC ON CC.useless = Post.postID;";
	connection.query (query, function (error, result) {
		if (error) {
			console.log(error);
			res.send("0");
		} else {
			res.json(result);
		}
	});
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