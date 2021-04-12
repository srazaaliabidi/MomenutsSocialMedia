function fillNav() {
	var navLinks = "<ul><li id=\"register\"><a href=\"../../user-info/register.html\">Register</a></li><li id=\"login\"><a href=\"../../user-info/login.html\">Login</a></li><li id=\"post\"><a href=\"../../gallery/post.html\">Post</a></li><li id=\"collection\"><a href=\"../../gallery/collection.html\">Collection</a></li><li id=\"home\"><a href=\"../../index.html\">Home</a></li><li id=\"logout\">Logout</li></ul>";
	document.getElementsByTagName('nav')[0].innerHTML += navLinks;
}

function fillFooter() {
	var footerButton = "<button id=\"moreButton\" type=\"button\">?</button>";
	var footLinks = "<ul id=\"footerLinks\"><li><a href=\"../../site-info/about/about.html\">About</a></li><li>Settings</li><li>Contact</li></ul>";
	document.getElementsByTagName('footer')[0].innerHTML += footerButton + footLinks;
}