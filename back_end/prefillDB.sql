INSERT INTO Users (email, username, password, firstName, lastName, city, state, DOB, pfpURL) VALUES ('test@test.com', 'test', 'n4bQgYhMfWWaL+qgxVrQFaO/TxsrC4Is0V1sFbDwCgg=', 'Frederick', 'Test', 'San Francisco', 'CA', '1995-01-01', 'https://i.pinimg.com/564x/7d/30/af/7d30af5fab847c50dbc1964f4f26b8cf.jpg');
INSERT INTO Users (email, username, password, firstName, lastName, city, state, DOB, pfpURL) VALUES ('cd@gmail.com', 'cd', 'Iechw1pYI/20UvovnwphLHT7lS4GknSJxrJ6Q7gXvtQ=', 'Frederick', 'Test', 'San Francisco', 'CA', '1998-01-01', 'http://mattrbolles.com/bluecircle.png');
INSERT INTO Post (userID, caption, type, contentURL, content, dateCreated) VALUES ('1', 'test photo post', 'photo', 'http://mattrbolles.com/charles.jpg', 'none', '1620690153133');
INSERT INTO Post (userID, caption, type, contentURL, content, dateCreated) VALUES ('1', 'none', 'text', 'none', 'This is a test text post. Yeehaw!', '1617700253133');
INSERT INTO Post (userID, caption, type, contentURL, content, dateCreated) VALUES ('1', 'This is the doge', 'photo', 'https://akm-img-a-in.tosshub.com/indiatoday/images/story/202104/dog_0.jpg?0eRKF4LDdm4ZvhiSRkuG6rapiNKbilig&size=770:433', 'none', '1620680153133');
INSERT INTO Post (userID, caption, type, contentURL, content, dateCreated) VALUES ('1', 'Another test image', 'photo', 'https://i.jpg.dog/content/images/system/logo_1530884671755_5d660e.svg', 'none', '1621690153133');
INSERT INTO Post (userID, caption, type, contentURL, content, dateCreated) VALUES ('1', 'none', 'text', 'none', 'We love doge', '1619090153133');
INSERT INTO Post (userID, caption, type, contentURL, content, dateCreated) VALUES ('2', 'hehehe', 'photo', 'https://i.pinimg.com/564x/7d/30/af/7d30af5fab847c50dbc1964f4f26b8cf.jpg', 'none', '1621461088254');
INSERT INTO Post (userID, caption, type, contentURL, content, dateCreated) VALUES ('2', 'sponge boob', 'photo', 'https://ugc.reveliststatic.com/gen/constrain/640/640/80/2019/06/05/14/8i/5d/pooxrfjxc01bw.png', 'none', '1621461088254');
INSERT INTO Post (userID, caption, type, contentURL, content, dateCreated) VALUES ('2', 'unga', 'photo', 'https://api.time.com/wp-content/uploads/2019/08/caveman-spongebob-spongegar.png', 'none', '1621461088254');
INSERT INTO Post (userID, caption, type, contentURL, content, dateCreated) VALUES ('2', '????????', 'photo', 'http://i.imgflip.com/16zzgq.jpg', 'none', '1621461088254');
INSERT INTO Post (userID, caption, type, contentURL, content, dateCreated) VALUES ('2', ':0', 'photo', 'https://www.technobuffalo.com/sites/technobuffalo.com/files/styles/large/public/wp/2016/03/surprised-patrick-and-spongebob.jpg', 'none', '1621461088254');
INSERT INTO Collections (userID, name, iconURL, dateCreated, lastUpdated) VALUES ('2', 'My Collection', 'https://cdn2.iconfinder.com/data/icons/files-and-folders-15/48/11-512.png', '1621461088254', '1621461088254');
INSERT INTO Collection_Content (postID, collectionID, dateAdded) VALUES ('6', '1', '000');
INSERT INTO Comments (postID, cuID, comment, dateCommented) VALUES ('7', '1', 'test comment content 1', '1621461086254');
INSERT INTO Comments (postID, cuID, comment, dateCommented) VALUES ('7', '1', 'test comment content 2', '1621461085254');
INSERT INTO Comments (postID, cuID, comment, dateCommented) VALUES ('6', '1', 'test comment content 3', '1621461084254');
INSERT INTO Comments (postID, cuID, comment, dateCommented) VALUES ('6', '1', 'test comment content 4', '1621461083254');
INSERT INTO Comments (postID, cuID, comment, dateCommented) VALUES ('7', '1', 'test comment content 5', '1621461088254');
INSERT INTO Favorites (postID, fuID, dateFavorite) VALUES ('6', '1', '1621461088254');
INSERT INTO Favorites (postID, fuID, dateFavorite) VALUES ('6', '2', '1621461088254');
INSERT INTO Collections (userID, name, iconURL, dateCreated, lastUpdated) VALUES ('1', 'My Collection2', 'https://cdn2.iconfinder.com/data/icons/files-and-folders-15/48/11-512.png', '1621461088254', '1621461088254');
INSERT INTO Collection_Content (postID, collectionID, dateAdded) VALUES ('7', '2', '1621461288254');
INSERT INTO Comments (postID, cuID, comment, dateCommented) VALUES ('7', '1', 'test comment content', '1621461085254');
INSERT INTO Collection_Content (postID, collectionID, dateAdded) VALUES ('6', '2', '1621461388254');
