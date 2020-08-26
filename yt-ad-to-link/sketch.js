
// © 2020 Benjamin Aster


let id = "";
let url = "";
let prevId = "";
let prevDebugInfo;
let debugInfo;
let prevFocused = false;
let copied = false;
let actionTaken = false;
let alreadyContained = true;
let title = "";
let ids = [];
let prevDebugInfoPasted = 0;
//let keys = [];

const this_list = `<a href="./links">this</a> list`;

let openAutomatically = (getCookie("open-ad-link-automatically") == "true");

document.getElementById("open-automatically").checked = openAutomatically;

document.getElementById("open-automatically").onclick = function () {
	let checked = document.getElementById("open-automatically").checked;
	openAutomatically = checked;
	setCookie("open-ad-link-automatically", str(checked), 365);
	document.getElementById("debug-info-textarea").focus();
};

document.getElementById("debug-info-textarea").ondblclick = function () {
	this.value = "";
}


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


function createUrl() {
	debugInfo = document.getElementById("debug-info-textarea").value;
	prevId = id;
	if (debugInfo != prevDebugInfo) {
		prevDebugInfo = debugInfo;
		debugInfo = debugInfo.split('"');

		for (let i = 0; i < debugInfo.length; i++) {
			if (debugInfo[i] == "ad_docid" || debugInfo[i] == "videoid") {
				id = debugInfo[i + 2];
				break;
			}
		}
	}
}

function setup() {

	database.on("/unlistedAdLinks", () => {
		database.read("/unlistedAdLinks", (data) => {
			keys = Object.keys(data);
			ids = Array(keys.length);
			document.querySelector("#num-of-links").innerHTML = keys.length;
			for (let key in keys) {
				ids[key] = data[keys[key]].id;
			}
		});
	})

}

function draw() {
	if (ids.length > 0) {
		createUrl();
	}

	if (prevId != id && id != "") {
		actionTaken = false;

		url = `https://www.youtube.com/watch?v=${id}`;
		title = "";

		prevDebugInfoPasted = millis();

		document.getElementById("url-infos").hidden = false;

		if (ids.includes(id)) {
			document.getElementById("url-infotext").innerHTML =
				`<span style="color: springGreen;">already</span> in ${this_list}`
			alreadyContained = true;
		} else {
			document.getElementById("url-infotext").innerHTML =
				`<span style="color: yellow;">adding</span> to ${this_list}...`
			alreadyContained = false;
		}
		document.getElementById("url").innerText = url;
		document.getElementById("url").href = url;


		document.getElementById("title").innerText = "...";
		getTitle(`https://www.youtube.com/embed/${id}`, successCallback = function (_title) {
			title = _title.substring(0, _title.length - 10);
			document.getElementById("title").innerText = title;

			if (!alreadyContained) {
				if (title == "") {
					document.getElementById("url-infotext").innerHTML =
						`<span style="color: red;">ERROR - This video doesn't exist</span>`;
				} else {
					database.push("/unlistedAdLinks", {
						id: id,
						title: escapeHtmlEntities(title),
					});
					document.getElementById("url-infotext").innerHTML =
						`<span style="color: springGreen;">successfully added</span> to ${this_list}`;
				}
			}
		});


		document.getElementById("button-new-tab").hidden = false;
		document.getElementById("button-new-tab").onclick = function () {
			window.open(url, '_blank');
			actionTaken = true;
		};
		document.getElementById("button-this-tab").hidden = false;
		document.getElementById("button-this-tab").onclick = function () {
			window.open(url, '_self');
			actionTaken = true;
		};

		document.getElementById("button-copy").hidden = false;
		document.getElementById("button-copy").innerText = "Copy";
		copied = false;
		document.getElementById("button-copy").onmouseover = function () { };
		document.getElementById("button-copy").onmouseout = function () { };

		document.getElementById("button-copy").onclick = function () {
			let el = document.createElement('textarea');
			el.value = url;
			document.body.appendChild(el);
			el.select();
			document.execCommand('copy');
			document.body.removeChild(el);
			this.innerText = "Copied!";
			copied = true;
			actionTaken = true;

			document.getElementById("button-copy").onmouseover = function () {
				this.style.whiteSpace = "nowrap";
				this.innerHTML = "Copy again";
				this.style.width = "16vh";
			};
			document.getElementById("button-copy").onmouseout = function () {
				this.style.whiteSpace = "nowrap";
				this.innerHTML = "Copied!";
				this.style.width = "12vh";
			};
		};

		if (document.getElementById("open-automatically").checked) {
			actionTaken = true;
			window.open(url, "_blank");
		}
	}


	if (id != "" && title == "" && millis() - prevDebugInfoPasted >= 3000) {
		title = "ERROR - Couldn't get title";

		document.getElementById("title").innerText = title;

		if (!alreadyContained) {
			database.push("/unlistedAdLinks", {
				id: id,
				title: escapeHtmlEntities(title),
			});
			document.getElementById("url-infotext").innerHTML =
				`<span style="color: springGreen;">added</span> to ${this_list}, but couldn't get title`;
		}

	}


	if (focused && !prevFocused) {
		document.getElementById("debug-info-textarea").focus();
		document.getElementById("debug-info-textarea").value = "";
	}

	prevFocused = focused;
}

/*
for (let id = 0; id < ids.length; id++) {
	for (let i = 0; i < id; i++) {
		if (ids[i] == ids[id]) {
			console.log(i, ids[i], id, ids[id]);
		}
	}
}
*/