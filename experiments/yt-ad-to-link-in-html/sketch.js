
/*
document.querySelector("#url").innerHTML = `<a href="https://example.com">example</a>`;

console.log("testtest");


document.querySelector("#button-1").innerHTML = `<button onclick='window.open("https://example.com", "_blank")'>example</a>`;
document.querySelector("#button-2").innerHTML = `<button onclick='window.open("https://example.com", "_blank")'>example2</a>`;
*/

// ************************************************

// © 2020 Benjamin Aster


let url = "";
let prevUrl = "";
let prevDebugInfo;
let debugInfo;
let prevFocused = false;

let openAutomatically = (getCookie("open-ad-link-automatically") == "true");

document.getElementById("open-automatically").checked = openAutomatically;

document.getElementById("open-automatically").onclick = function () {
	let checked = document.getElementById("open-automatically").checked;
	openAutomatically = checked;
	setCookie("open-ad-link-automatically", str(checked), 365);
	document.getElementById("debug-info-textarea").focus();
};

function createUrl() {
	debugInfo = document.getElementById("debug-info-textarea").value;
	prevUrl = url;
	if (debugInfo != prevDebugInfo) {
		prevDebugInfo = debugInfo;
		debugInfo = debugInfo.split('"');
		url = "";

		for (let i = 0; i < debugInfo.length; i++) {
			if (debugInfo[i] == "ad_docid") {
				url = "https://www.youtube.com/watch?v=" + debugInfo[i + 2];
				break;
			}
		}
	}
}

function draw() {
	createUrl();

	if (prevUrl != url && url != "") {
		document.getElementById("url-infotext").hidden = false;
		document.getElementById("url").innerText = url;
		document.getElementById("url").href = url;
		document.getElementById("button-new-tab").hidden = false;
		document.getElementById("button-new-tab").onclick = function () { window.open('https://example.com', '_blank') };
		document.getElementById("button-this-tab").hidden = false;
		document.getElementById("button-this-tab").onclick = function () { window.open('https://example.com', '_self') };

		document.getElementById("button-copy").hidden = false;
		document.getElementById("button-copy").onclick = function () {
			let el = document.createElement('textarea');
			el.value = url;
			document.body.appendChild(el);
			el.select();
			document.execCommand('copy');
			document.body.removeChild(el);
			document.getElementById("button-copy").innerHTML = "Copied!";
		};

		if (document.getElementById("open-automatically").checked) {
			window.open(url, "_blank");
		}
	}
	if (focused && !prevFocused) {
		document.getElementById("debug-info-textarea").focus();
	}

	prevFocused = focused;
}