const functions = require("./functions");
const expect = require('expect');
/*
test('Post By Id', done => {
	functions.postById(2, function(jason) {
		try {
			expect(jason).toEqual(
				expect.arrayContaining([
					expect.objectContaining({
						postID: 2
					})
				])
			);
			done();
		} catch (error) {
			done(error);
		}
	});
});

test('Logs in User', done => {
	functions.login("test", "test", function(jason) {
		try {
			expect(jason).toEqual(1);
			done();
		} catch (error) {
			done(error);
		}
	});
});
*/
/*
test('Registers new User', function() {
	expect(functions.register("test@gmail.com", "testUName", "testPass", "testFirst", "testtLast", "testCity", "testState", "testDOB").responseText).toEqual("1");
});*/

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
/*
test('Creates New Image Post', function() {
	expect(functions.newPostImage("testImageTitle", "testCaption").responseText).toEqual("1");
});
*/


