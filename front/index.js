var host = "http://localhost:3000";
//var host = "http://csc648db.ctbbxcp0jnib.us-west-1.rds.amazonaws.com";
//var host = "http://52.53.216.50";

function fetchHomeData() {
	$.ajax({
		type: "GET",
	    url: host + '/getHome',
	    success: function(result, status) {
	    	var jason = JSON.parse(result);
	    	if (jason.length == 0) {
	    		showNothing();
	    	} else {
		    	prepareHome(jason);
		    	fillHome(jason);
	    	}
	    },
	    error: function(status, errorCode) {
	    	showNothing();
	    }
	});
}

function showNothing() {
	document.getElementsByTagName('div')[0].innerHTML += "<p>got nothing</p>";
}

function prepareHome(dataArray) {
	var preparation = "<table align=\"center\" cellspacing=\"10\">";
	for(var count = 0; count < dataArray.length; count++){
		preparation += "<tr><td></td></tr>";
		preparation += "<tr><td></td></tr>";
	}
	preparation += "</table>";
	document.getElementsByTagName('main')[0].innerHTML += preparation;
}

function fillHome(dataArray) {
	var tableRows = document.getElementsByTagName('td');
	for (var count = 0; count < tableRows.length; count++) {
		if (count % 2 == 0) {
			addUserInfo(dataArray, count/2, tableRows[count]);
		} else {
			addContent(dataArray, Math.floor(count/2), tableRows[count]);
		}
	}
}

function addUserInfo(dataArray, count, row) {
	var fill = "";
	fill += "<div>";
	fill += "<img src=\""+dataArray[count]["pfpURL"]+"\" alt=\"profile_pic\" class=\"profile_pic\" width=\"50px\" height=\"50px\">";
	fill += "<p>Posted by "+dataArray[count]["username"]+"</p>";
	fill += "</div>";
	row.innerHTML += fill;
} 

function addContent(dataArray, count, row) {
	var fill = "";
	fill += "<div>";
	var type = dataArray[count]["type"];
	if (type === "text") {
		fill += "<p>"+dataArray[count]["content"]+"</p>";
	} else if (type === "photo") {
		fill += "<img src=\""+dataArray[count]["contentURL"]+"\" alt=\"post_pic\">";
	} else if (type === "video") {
		fill += "<p>this is a vid</p>";
	}
	fill += "</div><div>";
	fill += "<p>Posted on "+dataArray[count]["dateCreated"]+"</p>";
	fill += "</div>";
	row.innerHTML += fill;
} 


