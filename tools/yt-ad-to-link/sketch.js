
// © 2020 Benjamin Aster


let url = "";
let prevUrl = "";
let prevDebugInfo;
let debugInfo;
let prevFocused = false;
let copied = false;
let actionTaken = false;
let title = "";
let links = [];

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
	prevUrl = url;
	if (debugInfo != prevDebugInfo) {
		prevDebugInfo = debugInfo;
		debugInfo = debugInfo.split('"');

		for (let i = 0; i < debugInfo.length; i++) {
			if (debugInfo[i] == "ad_docid") {
				url = "https://www.youtube.com/watch?v=" + debugInfo[i + 2];
				break;
			}
		}
	}
}

function preload() {
	links = loadStrings("./links/unlisted-ad-links.txt");
	//links = loadStrings("https://benjaminaster.github.io/tools/yt-ad-to-link/links/unlisted-ad-links.txt");
}

function draw() {
	createUrl();

	if (prevUrl != url && url != "") {
		actionTaken = false;

		document.getElementById("url-infos").hidden = false;
		document.getElementById("url-infotext").innerHTML = `The original video of the ad (${
			(links.includes(url)) ? "already" : "not contained"
			} in <a href="./links">this</a> list):`;
		document.getElementById("url").innerText = url;
		document.getElementById("url").href = url;

		document.getElementById("title").innerText = "loading title...";
		getTitle(`https://youtube.com/embed/${url.substring(32, url.length)}`, successCallback = function (_title) {
			title = _title.substring(0, _title.length - 10);
			document.getElementById("title").innerText = title;
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
				//document.getElementById("button-copy").style.transition = "all 2s";
				this.style.whiteSpace = "nowrap";
				this.innerHTML = "Copy again";
				this.style.width = "16vh";
			};
			document.getElementById("button-copy").onmouseout = function () {
				//document.getElementById("button-copy").style.transition = "all 2s";
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
	if (focused && !prevFocused) {
		document.getElementById("debug-info-textarea").focus();
		if (actionTaken) {
			document.getElementById("debug-info-textarea").value = "";
		}
	}

	prevFocused = focused;
}