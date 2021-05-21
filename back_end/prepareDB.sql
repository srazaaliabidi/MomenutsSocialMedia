CREATE TABLE IF NOT EXISTS Users (
  userID int NOT NULL AUTO_INCREMENT,
  email varchar(50) NOT NULL,
  username varchar(45) UNIQUE NOT NULL,
  password varchar(45) NOT NULL,
  firstName varchar(50) NOT NULL,
  lastName varchar(50) NOT NULL,
  city varchar(45) DEFAULT NULL,
  state varchar(45) NOT NULL,
  DOB date NOT NULL,
  privacy int NOT NULL DEFAULT 0,
  pfpURL varchar(225) NOT NULL,
  PRIMARY KEY (userID)
);

CREATE TABLE IF NOT EXISTS Post (
  postID int NOT NULL AUTO_INCREMENT,
  userID int NOT NULL,
  title varchar(127) NOT NULL,
  caption varchar(255),
  type enum('text', 'photo', 'video') NOT NULL,
  contentURL varchar(225),
  content text(65535),
  dateCreated BIGINT NOT NULL,
  PRIMARY KEY (postID),
  FOREIGN KEY (userID) REFERENCES Users(userID)
);

CREATE TABLE IF NOT EXISTS Comments (
  commentID int NOT NULL AUTO_INCREMENT,
  postID int NOT NULL,
  cuID int NOT NULL,
  comment varchar(255) NOT NULL,
  dateCommented BIGINT NOT NULL,
  PRIMARY KEY (commentID),
  FOREIGN KEY (cuID) REFERENCES Users(userID),
  FOREIGN KEY (postID) REFERENCES Post(postID)
);

CREATE TABLE IF NOT EXISTS Favorites (
  postID int NOT NULL,
  fuID int NOT NULL,
  dateFavorite BIGINT NOT NULL,
  FOREIGN KEY (fuID) REFERENCES Users(userID),
  FOREIGN KEY (postID) REFERENCES Post(postID)
);

CREATE TABLE IF NOT EXISTS Follow (
  userIDFollowing int NOT NULL,
  userIDFollowed int NOT NULL,
  dateFollowed BIGINT NOT NULL,
  FOREIGN KEY (userIDFollowing) REFERENCES Users(userID),
  FOREIGN KEY (userIDFollowed) REFERENCES Users(userID)
);

CREATE TABLE IF NOT EXISTS Messages (
  messageID int NOT NULL AUTO_INCREMENT,
  userIDReceiver int NOT NULL,
  userIDSender int NOT NULL,
  content varchar(255) NOT NULL,
  dateSent BIGINT NOT NULL,
  PRIMARY KEY (messageID),
  FOREIGN KEY (userIDReceiver) REFERENCES Users(userID),
  FOREIGN KEY (userIDSender) REFERENCES Users(userID)
);

CREATE TABLE IF NOT EXISTS Collections (
  collectionID int NOT NULL AUTO_INCREMENT,
  userID int NOT NULL,
  name varchar(255) NOT NULL,
  iconURL varchar(225),
  dateCreated BIGINT NOT NULL,
  lastUpdated BIGINT NOT NULL,
  PRIMARY KEY (collectionID),
  FOREIGN KEY (userID) REFERENCES Users(userID)
);

CREATE TABLE IF NOT EXISTS Collection_Content (
  postID int NOT NULL,
  collectionID int NOT NULL,
  dateAdded BIGINT NOT NULL,
  FOREIGN KEY (postID) REFERENCES Post(postID),
  FOREIGN KEY (collectionID) REFERENCES Collections(collectionID)
);




