


//let astleyUrl = "https://www.youtube.com/embed/dQw4w9WgXcQ";

let urls = [
	"https://www.youtube.com/embed/dQw4w9WgXcQ",  // Rick Astley - Never Gonna Give You Up (Video)
	"https://www.youtube.com/embed/YbJOTdZBX1g",  // YouTube Rewind 2018: Everyone Controls Rewind | #YouTubeRewind
	"https://www.youtube.com/embed/kffacxfA7G4",  // Justin Bieber - Baby ft. Ludacris (Official Music Video)
	"https://www.youtube.com/embed/kJQP7kiw5Fk",  // Luis Fonsi - Despacito ft. Daddy Yankee
]

function getTitle(url, successCallback = function () { }) {
	let title = undefined;
	$.ajax({
		url: `http://textance.herokuapp.com/title/${url}`,
		complete: function (data) {
			title = data.responseText;
			title = title.substring(0, title.length - 10);
			successCallback(title);
		}
	});
}

for (let i = 0; i < urls.length; i++) {
	getTitle(url = urls[i], successCallback = function (title) {
		console.log(title);
	});
}

