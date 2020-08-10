

let ids;
let titles;
let titleCount = 0;
let innerHTMLArray;

function getTitle(url, successCallback = function () { }) {
	let title = "ERROR";
	$.ajax({
		//url: `https://cors-anywhere.herokuapp.com/${url}`,
		url: `https://textance.herokuapp.com/title/${url}`,
		complete: function (data) {
			title = data.responseText;
			successCallback(title);
		}
	});
}


function setup() {
	ids = loadStrings("https://benjaminaster.com/yt-ad-to-link/links/unlisted-ad-links.txt", success = function () {
		document.querySelector("#num-of-links").innerHTML = ids.length;
		ids.forEach(function (item, index) {
			ids[index] = item.substring(32, item.length);
		});
		innerHTMLArray = [];
		titles = Array(ids.length).fill("error");
		for (let i = 0; i < ids.length; i++) {
			innerHTMLArray.push(`<li> <span class="url"><a href="https://www.youtube.com/watch?v=${ids[i]}"> https://www.youtube.com/watch?v=${ids[i]}</a></span> ${""
				}&#9472 ...`);

			getTitle(`https://www.youtube.com/embed/${ids[i]}`, successCallback = function (title) {
				titles[i] = title.substring(0, title.length - 10);
				innerHTMLArray[i] = `<li> <span class="url"><a href="https://www.youtube.com/watch?v=${ids[i]}"> https://www.youtube.com/watch?v=${ids[i]}</a></span> ${""
					}&#9472 <span class="title">${titles[i]}</span></li>`;
					titleCount++;
				if (titleCount % 10 == 0 || titleCount >= ids.length) {
					document.querySelector(".urls").innerHTML = innerHTMLArray.join("");
				}
			});

		}
		document.querySelector(".urls").innerHTML = innerHTMLArray.join("");
	});
}

