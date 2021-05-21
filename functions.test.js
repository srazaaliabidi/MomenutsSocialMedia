const functions = require("./functions");
const expect = require('expect');
const path = require("path");

test('All User Collection', done => {
	functions.allCollection(2, function(jason) {
		try {
			expect(jason).toEqual(
				expect.arrayContaining([
					expect.objectContaining({
						userID: 2
					})
				])
			);
			done();
		} catch (error) {
			done(error);
		}
	});
});

test('New Collection', done => {
	functions.newCollection("testlol", 2, function(jason) {
		try {
			expect(jason).toEqual([]);
			done();
		} catch (error) {
			done(error);
		}
	});
});

test('Append Collection', done => {
	functions.appendCollection(2, 3, function(jason) {
		try {
			expect(jason).toEqual(
				expect.arrayContaining([
					expect.objectContaining({
						postID: 3
					})
				])
			);
			done();
		} catch (error) {
			done(error);
		}
	});
});

test('View Collection', done => {
	functions.viewCollection(1, function(jason) {
		try {
			expect(jason).toEqual(
				expect.arrayContaining([
					expect.objectContaining({
						postID: 6
					})
				])
			);
			done();
		} catch (error) {
			done(error);
		}
	});
});

test('Post By Id', done => {
	functions.postById(7, function(jason) {
		try {
			expect(jason).toEqual(
				expect.arrayContaining([
					expect.objectContaining({
						postID: 7
					})
				])
			);
			done();
		} catch (error) {
			done(error);
		}
	});
});

test('Post By User', done => {
	functions.postByUser(2, function(jason) {
		try {
			expect(jason).toEqual(
				expect.arrayContaining([
					expect.objectContaining({
						userID: 2
					})
				])
			);
			done();
		} catch (error) {
			done(error);
		}
	});
});

test('Get Profile', done => {
	functions.getProfile(2, function(jason) {
		try {
			expect(jason).toEqual(
				expect.arrayContaining([
					expect.objectContaining({
						userID: 2
					})
				])
			);
			done();
		} catch (error) {
			done(error);
		}
	});
});

test('Logs out User', done => {
	functions.logout(function(jason) {
		try {
			expect(jason).toEqual(1);
			done();
		} catch (error) {
			done(error);
		}
	});
});

test('Logs in User', done => {
	functions.login("cd", "cd", function(jason) {
		try {
			expect(jason).toEqual(
				expect.arrayContaining([
					expect.objectContaining({
						userID: 2
					})
				])
			);
			done();
		} catch (error) {
			done(error);
		}
	});
});

test('Favorite', done => {
	functions.favorite(7, function(jason) {
		try {
			expect(jason).toEqual(
				expect.arrayContaining([
					expect.objectContaining({
						postID: 7
					})
				])
			);
			done();
		} catch (error) {
			done(error);
		}
	});
});

test('Get Favorite Post', done => {
	functions.getFavPost(6, function(jason) {
		try {
			expect(jason).toEqual(
				expect.arrayContaining([
					expect.objectContaining({
						postID: 6
					})
				])
			);
			done();
		} catch (error) {
			done(error);
		}
	});
});

test('Get ALL Favorite', done => {
	functions.getAllFav(1, function(jason) {
		try {
			expect(jason).toEqual(
				expect.arrayContaining([
					expect.objectContaining({
						userID: 2
					})
				])
			);
			done();
		} catch (error) {
			done(error);
		}
	});
});

test('Registers new User', done => {
	functions.register("test@gmail.com", "testUName", "test", "testFirst", "testtLast", "testCity", "testState", "testDOB", "http://mattrbolles.com/bluecircle.png", function(jason) {
		try {
			expect(jason).toEqual(
				expect.arrayContaining([
					expect.objectContaining({
						username: "testUName"
					})
				])
			);
			done();
		} catch (error) {
			done(error);
		}
	});
});

test('Creates New Text Post', done => {
	functions.newPostText("testTextTitle", "testContent", function(jason) {
		try {
			expect(jason).toEqual(
				expect.arrayContaining([
					expect.objectContaining({
						title: "testTextTitle", 
						content: "testContent"
					})
				])
			);
			done();
		} catch (error) {
			done(error);
		}
	});
});

test('Creates New Image Post Link', done => {
	functions.newPostImageLink("testImageTitle", "testCaption", "http://mattrbolles.com/bluecircle.png", function(jason) {
		try {
			expect(jason).toEqual(
				expect.arrayContaining([
					expect.objectContaining({
						title: "testImageTitle", 
						caption: "testCaption"
					})
				])
			);
			done();
		} catch (error) {
			done(error);
		}
	});
});


