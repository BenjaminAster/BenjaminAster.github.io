

let ids;
let titles;
let HTMLString = "";

function getTitle(url, successCallback = function () { }) {
	let title = "ERROR";
	$.ajax({
		url: `https://textance.herokuapp.com/title/${url}`,
		complete: function (data) {
			title = data.responseText;
			successCallback(title);
		}
	});
}

function setup() {
	ids = loadStrings("https://benjaminaster.github.io/tools/yt-ad-to-link/links/unlisted-ad-links.txt", success = function () {
		ids.forEach(function (item, index) {
			ids[index] = item.substring(32, item.length);
		});
		titles = Array(ids.length).fill("error");
		for (let i = 0; i < ids.length; i++) {
			getTitle(`https://youtube.com/embed/${ids[i]}`, successCallback = function (title) {
				titles[i] = title.substring(0, title.length - 10);
				document.querySelector(".urls").innerHTML +=
					`<li> <span class="url"><a href="https://www.youtube.com/watch?v=${ids[i]}"> https://www.youtube.com/watch?v=${ids[i]}</a></span> &#9472 <span class="title">${titles[i]}</span></li>\n`;
			});
		}
	});
}