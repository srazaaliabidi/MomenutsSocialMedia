

INSERT INTO Users (email, username, password, firstName, lastName, city, state, DOB, pfpURL) VALUES ('test@test.com', 'test', 'test', 'Frederick', 'Test', 'San Francisco', 'CA', '1995-01-01', 'http://mattrbolles.com/bluecircle.png');
INSERT INTO Post (userID, username, pfpURL, caption, type, contentURL, content, dateCreated) VALUES ('1', 'test', 'http://mattrbolles.com/bluecircle.png', 'test photo post', 'photo', 'http://mattrbolles.com/charles.jpg', 'none', '2021-03-31');
INSERT INTO Post (userID, username, pfpURL, caption, type, contentURL, content, dateCreated) VALUES ('1', 'test', 'http://mattrbolles.com/bluecircle.png', 'none', 'text', 'none', 'This is a test text post. Yeehaw!', '2021-03-31');
INSERT INTO Post (userID, username, pfpURL, caption, type, contentURL, content, dateCreated) VALUES ('123', 'Doge', 'http://mattrbolles.com/bluecircle.png', 'This is the doge', 'photo', 'https://akm-img-a-in.tosshub.com/indiatoday/images/story/202104/dog_0.jpg?0eRKF4LDdm4ZvhiSRkuG6rapiNKbilig&size=770:433', 'none', '2021-04-15');
INSERT INTO Post (userID, username, pfpURL, caption, type, contentURL, content, dateCreated) VALUES ('123', 'Doge', 'http://mattrbolles.com/bluecircle.png', 'Another test image', 'photo', 'https://i.jpg.dog/content/images/system/logo_1530884671755_5d660e.svg', 'none', '2021-04-15');
INSERT INTO Post (userID, username, pfpURL, caption, type, contentURL, content, dateCreated) VALUES ('123', 'Doge', 'http://mattrbolles.com/bluecircle.png', 'none', 'text', 'none', 'We love doge', '2021-04-15');
INSERT INTO Collections (collectionID, postID, username, dateCreated) VALUES ('001', '01', 'Doge', '2021-04-15');
INSERT INTO Collecitons (collectionID, postID, username, dateCreated) VALUES ('002', '02', 'Doge', '2021-04-15' );
