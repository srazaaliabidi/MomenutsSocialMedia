localStorage.setItem("host", "http://localhost:3001");
const CryptoJS = require("crypto-js");
const fetch = require("node-fetch");


async function getResponse(url, next) {
	let res = await fetch(url);
	let jason = await res.json();
	next(jason);
}

async function postResponse(url, data, next) {
	let res = await fetch(url, {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: data
	});
	let jason = await res.json();
	next(jason);
}

const postById = (id, next) => {
	var url = localStorage.getItem("host") + '/getPostByID';
	var data = JSON.stringify({postID: id});
	postResponse(url, data, function(jason) {
		next(jason);
	});
}

const register = (email, username, password, firstName, lastName, city, state, DOB) => {
	var hash = CryptoJS.SHA256(password);
	var xhttp = new XMLHttpRequest();
	xhttp.open("POST", localStorage.getItem("host") + '/testRegister', false);
	xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhttp.send("email="+email+"&username="+username+"&password="+hash.toString(CryptoJS.enc.Base64)+"&firstName="+firstName+"&lastName="+lastName+"&city="+city+"&state="+state+"&DOB="+DOB);
	return xhttp;
}

const login = (uname, pass, next) => {
	var hash = CryptoJS.SHA256(pass);
	var url = localStorage.getItem("host") + '/verifyUser';
	var data = JSON.stringify({username: uname, password: hash.toString(CryptoJS.enc.Base64)});
	postResponse(url, data, function(jason) {
		next(jason);
	});
}

const newPostText = (ttl, ctt, next) => {
	var url = localStorage.getItem("host") + '/newPostText';
	var data = JSON.stringify({title: ttl, content: ctt});
	postResponse(url, data, function(jason) {
		if (jason == 0) { console.log("post not made"); next(jason); return; }
		postById(jason.id, function(jason2) {
			next(jason2);
		})
	});
}

const newPostImage = (title, caption) => {
	var xhttp = new XMLHttpRequest();
	xhttp.open("POST", localStorage.getItem("host") + '/testNewPostImage', false);
	xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhttp.send("title="+title+"&caption="+caption);
	return xhttp;
}

module.exports = {postById, register, login, newPostText, newPostImage};