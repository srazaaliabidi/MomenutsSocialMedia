const functions = require("./functions");
const expect = require('expect');


test('Post By Id', function() {
	console.log(functions.postById(2).responseText);
	expect(JSON.parse(functions.postById(2).responseText)).toEqual(
		expect.arrayContaining([
			expect.objectContaining({
				postID: 2
			})
		])
	);
});
/*
test('Registers new User', function() {
	expect(functions.register("test@gmail.com", "testUName", "testPass", "testFirst", "testtLast", "testCity", "testState", "testDOB").responseText).toEqual("1");
});

test('Logs in User', function() {
	expect(functions.login("testUName", "testPass").responseText).toEqual("1");
});
test('Creates New Text Post', function() {
	expect(functions.newPostText("testTextTitle", "testContent").responseText).toEqual("1");
});

test('Creates New Image Post', function() {
	expect(functions.newPostImage("testImageTitle", "testCaption").responseText).toEqual("1");
});
*/


