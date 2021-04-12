
function addPostText(event) {
	event.preventDefault();
	$.ajax({
		type: "POST",
		url: localStorage.getItem("host") + '/newPostText',
		data: {
			title: document.getElementById("textTitle").value,
			content: document.getElementById("content").value
		}
	}).done(function(result) {
		if (result === "0") {
			alert("database error");
		} else {
			alert("successfully added post");
		}
	}).fail(function(status, errorCode) {
		alert("request fail");
	});
}

function addPostImage(event) {
	event.preventDefault();
	$.ajax({
		type: "POST",
		url: localStorage.getItem("host") + '/newPostImage',
		data: {
			title: document.getElementById("imageTitle").value,
			contentURL: document.getElementById("contentURL").value,
			caption: document.getElementById("caption").value
		}
	}).done(function(result) {
		if (result === "0") {
			alert("database error");
		} else {
			alert("successfully added post");
		}
	}).fail(function(status, errorCode) {
		alert("request fail");
	});
}