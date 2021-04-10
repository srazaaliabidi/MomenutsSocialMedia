function verifyUser(event) {
	event.preventDefault();
	var encode = encodePass(document.getElementById("password").value);
	$.ajax({
		type: "POST",
		url: localStorage.getItem("host") + '/verifyUser',
		data: {
			username: document.getElementById("username").value,
			password: encode
		}
	}).done(function(result) {
		if (result === "0") {
			alert("wrong credentials");
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

