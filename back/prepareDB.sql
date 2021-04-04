CREATE TABLE IF NOT EXISTS Users (
  userID int NOT NULL AUTO_INCREMENT,
  email varchar(50) NOT NULL,
  username varchar(45) NOT NULL,
  password varchar(45) NOT NULL,
  firstName varchar(50) NOT NULL,
  lastName varchar(50) NOT NULL,
  city varchar(45) DEFAULT NULL,
  state varchar(45) NOT NULL,
  DOB date NOT NULL,
  pfpURL varchar(225) NOT NULL,
  PRIMARY KEY (userID)
);

CREATE TABLE IF NOT EXISTS Post (
  postID int NOT NULL AUTO_INCREMENT,
  userID int NOT NULL,
  caption varchar(250) NOT NULL,
  type enum('text', 'photo', 'video') NOT NULL,
  contentURL varchar(225),
  content text(65535) NOT NULL,
  dateCreated date NOT NULL,
  PRIMARY KEY (postID),
  FOREIGN KEY (userID) REFERENCES Users(userID)
);

CREATE TABLE IF NOT EXISTS Comments (
  commentID int NOT NULL AUTO_INCREMENT,
  postID int NOT NULL,
  userID int NOT NULL,
  content varchar(255) NOT NULL,
  dateCreated date NOT NULL,
  PRIMARY KEY (commentID),
  FOREIGN KEY (userID) REFERENCES Users(userID),
  FOREIGN KEY (postID) REFERENCES Post(postID)
);

CREATE TABLE IF NOT EXISTS Likes (
  userID int NOT NULL,
  postID int NOT NULL,
  dateCreated date NOT NULL,
  FOREIGN KEY (userID) REFERENCES Users(userID),
  FOREIGN KEY (postID) REFERENCES Post(postID)
);

CREATE TABLE IF NOT EXISTS Messages (
  messageID int NOT NULL AUTO_INCREMENT,
  userIDReceiver int NOT NULL,
  userIDSender int NOT NULL,
  content varchar(255) NOT NULL,
  PRIMARY KEY (messageID),
  FOREIGN KEY (userIDReceiver) REFERENCES Users(userID),
  FOREIGN KEY (userIDSender) REFERENCES Users(userID)
);

INSERT INTO Users (email, username, password, firstName, lastName, city, state, DOB, pfpURL) VALUES ('test@test.com', 'test', 'test', 'Frederick', 'Test', 'San Francisco', 'CA', '1995-01-01', 'http://mattrbolles.com/bluecircle.png');
INSERT INTO Post (userID, username, pfpURL, caption, type, contentURL, content, dateCreated) VALUES ('1', 'test', 'http://mattrbolles.com/bluecircle.png', 'test photo post', 'photo', 'http://mattrbolles.com/charles.jpg', 'none', '2021-03-31');
INSERT INTO Post (userID, username, pfpURL, caption, type, contentURL, content, dateCreated) VALUES ('1', 'test', 'http://mattrbolles.com/bluecircle.png', 'none', 'text', 'none', 'This is a test text post. Yeehaw!', '2021-03-31');





