

INSERT INTO Users (email, username, password, firstName, lastName, city, state, DOB, pfpURL) VALUES ('test@test.com', 'test', 'test', 'Frederick', 'Test', 'San Francisco', 'CA', '1995-01-01', 'http://mattrbolles.com/bluecircle.png');
INSERT INTO Post (userID, username, pfpURL, caption, type, contentURL, content, dateCreated) VALUES ('1', 'test', 'http://mattrbolles.com/bluecircle.png', 'test photo post', 'photo', 'http://mattrbolles.com/charles.jpg', 'none', '2021-03-31');
INSERT INTO Post (userID, username, pfpURL, caption, type, contentURL, content, dateCreated) VALUES ('1', 'test', 'http://mattrbolles.com/bluecircle.png', 'none', 'text', 'none', 'This is a test text post. Yeehaw!', '2021-03-31');
