function createNewUser(event) {
	event.preventDefault();
	var encode = encodePass(document.getElementById("password").value);
	$.ajax({
		type: "POST",
		url: localStorage.getItem("host") + '/newUser',
		data: {
			email: document.getElementById("email").value,
			username: document.getElementById("username").value,
			password: encode,
			firstName: document.getElementById("firstName").value,
			lastName: document.getElementById("lastName").value,
			city: document.getElementById("city").value,
			state: document.getElementById("state").value,
			DOB: document.getElementById("DOB").value,
			pfpURL: document.getElementById("pfpURL").value
		}
	}).done(function(result) {
		if (result === "0") {
			alert("database error");
		} else {
			window.location.replace("../index.html");
		}
	}).fail(function(status, errorCode) {
		alert("request fail");
	});
}

function encodePass(pass) {
	var hash = CryptoJS.SHA256(pass);
	return hash.toString(CryptoJS.enc.Base64)
}