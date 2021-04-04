function fillFooter() {
	var footerLinks = "<table align=\"center\" width=\"50%\" cellspacing=\"10\" > <tr> <th> <a href=\"../site-info/about/about.html\"> About Us </a> </th> <th> <a href=\"../site-info/contact.html\"> Contact </a> </th> <th> <a href=\"../site-info/faq.html\"> FAQ </a> </th> </tr> <tr> <th> <a href=\"../site-info/terms-of-service.html\"> Terms of Service </a> </th> <th> <a href=\"../user-info/pages/login.html\"> Login </a> </th> <th> <a href=\"../user-info/pages/register.html\"> Register </a> </th> </tr> </table>";
	document.getElementsByTagName('footer')[0].innerHTML += footerLinks;
}

function fillNav() {
	var navLinks = "<ul ><li><a href=\"../index.html\">Home</a></li><li><a href=\"../user-info/user-info.html\">Subscriptions</a></li><li><a href=\"../user-info/account.html\">Account</a></li><li><a href=\"../site-info/about/about.html.html\">About</a></li><li><input id=\"submit\" type=\"submit\" ></li><li><input id = \"mySearch\" type= \"text\" name= \"Search\" placeholder=\"Search..\"></li></ul>";
	document.getElementsByTagName('nav')[0].innerHTML += navLinks;
}