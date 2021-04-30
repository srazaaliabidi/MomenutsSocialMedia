localStorage.setItem("host", "http://localhost:3001");
const CryptoJS = require("crypto-js");
const functions = {
	register: function(email, username, password, firstName, lastName, city, state, DOB) {
		var hash = CryptoJS.SHA256(password);
		var xhttp = new XMLHttpRequest();
		xhttp.open("POST", localStorage.getItem("host") + '/testRegister', false);
		xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		xhttp.send("email="+email+"&username="+username+"&password="+hash.toString(CryptoJS.enc.Base64)+"&firstName="+firstName+"&lastName="+lastName+"&city="+city+"&state="+state+"&DOB="+DOB);
		return xhttp;
	},
	login: function(username, password) {
		var hash = CryptoJS.SHA256(password);
		var xhttp = new XMLHttpRequest();
		xhttp.open("POST", localStorage.getItem("host") + '/testLogin', false);
		xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		xhttp.send("username="+username+"&password="+hash.toString(CryptoJS.enc.Base64));
		return xhttp;
	},
	newPostText: function(title, content) {
		var xhttp = new XMLHttpRequest();
		xhttp.open("POST", localStorage.getItem("host") + '/testNewPostText', false);
		xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		xhttp.send("title="+title+"&content="+content);
		return xhttp;
	},
	newPostImage: function(title, caption) {
		var xhttp = new XMLHttpRequest();
		xhttp.open("POST", localStorage.getItem("host") + '/testNewPostImage', false);
		xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		xhttp.send("title="+title+"&caption="+caption);
		return xhttp;
	}
} 

module.exports = functions;