function fillNav() {
	var navLinks = "<ul><li id=\"register\"><a href=\"user-info/register.html\">Register</a></li><li id=\"login\"><a href=\"user-info/login.html\">Login</a></li><li id=\"post\"><a href=\"gallery/post.html\">Post</a></li><li id=\"collection\"><a href=\"gallery/collection.html\">Collection</a></li><li id=\"home\"><a href=\"index.html\">Home</a></li><li id=\"logout\">Logout</li></ul>";
	document.getElementsByTagName('nav')[0].innerHTML += navLinks;
	document.getElementById("logout").onclick = function() {
		$.ajax({
			type: "POST",
		    url: localStorage.getItem("host") + '/logout'
		}).done(function(result) {
			document.getElementById("logged").innerHTML = "Not Logged In";
		}).fail(function(status, errorCode) {
			alert("could not logout");
		});
	}
}

function fillFooter() {
	var footerButton = "<button id=\"moreButton\" type=\"button\">?</button>";
	var footLinks = "<ul id=\"footerLinks\"><li><a href=\"site-info/about/about.html\">About</a></li><li>Settings</li><li>Contact</li></ul>";
	document.getElementsByTagName('footer')[0].innerHTML += footerButton + footLinks;
}

/*----------------------session---------------------------*/

function checkLogin() {
	$.ajax({
		type: "GET",
	    url: localStorage.getItem("host") + '/checkLogin'
	}).done(function(result) {
		var jason = JSON.parse(result);
		if (jason.length > 0){
			document.getElementById("logged").innerHTML = "Logged In As: \""+jason[0]["username"]+"\"";
		} else {
			document.getElementById("logged").innerHTML = "Not Logged In";
		}
	}).fail(function(status, errorCode) {
		document.getElementById("logged").innerHTML = "Not Logged In";
	});
}