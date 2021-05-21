const functions = require("./functions");
const expect = require('expect');
const path = require("path");

test('User register, log out, then log back in with new account', done => {
	functions.register("test@gmail.com", "testUName", "test", "testFirst", "testtLast", "testCity", "testState", "testDOB", "http://mattrbolles.com/bluecircle.png", function(jason) {
		try {
			expect(jason).toEqual(
				expect.arrayContaining([
					expect.objectContaining({
						username: "testUName"
					})
				])
			);
			functions.logout(function(jason) {
				try {
					expect(jason).toEqual(1);
					functions.login("testUName", "test", function(jason) {
						try {
							expect(jason).toEqual(
								expect.arrayContaining([
									expect.objectContaining({
										userID: 3
									})
								])
							);
							done();
						} catch (error) {
							done(error);
						}
					});
				} catch (error) {
					done(error);
				}
			});
		} catch (error) {
			done(error);
		}
	});
});

test('User login, creates a collection, creates a post, adds the post to the collection, logs out', done => {
	functions.login("cd", "cd", function(jason) {
		try {
			expect(jason).toEqual(
				expect.arrayContaining([
					expect.objectContaining({
						userID: 2
					})
				])
			);
			functions.newCollection("testlol", 2, function(jason) {
				try {
					expect(jason).toEqual([]);
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
							functions.appendCollection(3, 11, function(jason) {
								try {
									expect(jason).toEqual(
										expect.arrayContaining([
											expect.objectContaining({
												postID: 11
											})
										])
									);
									functions.logout(function(jason) {
										try {
											expect(jason).toEqual(1);
											done();
										} catch (error) {
											done(error);
										}
									});
								} catch (error) {
									done(error);
								}
							});
						} catch (error) {
							done(error);
						}
					});
				} catch (error) {
					done(error);
				}
			});
		} catch (error) {
			done(error);
		}
	});
});


