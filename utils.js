
function addScript(path) {
	let urls = {
		"p5js": "https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.1.9/p5.js",
		"p5jsSound": "https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.1.9/addons/p5.sound.js",
	}

	console.log(urls.path);


	let imported = document.createElement("script");
	imported.scr = path;
	document.head.appendChild(imported);
}

function setCookie(cname, cvalue, exdays) {
	var d = new Date();
	d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
	var expires = "expires=" + d.toGMTString();
	document.cookie = cname + "=" + cvalue + ";" + expires;
}

function getCookie(cname) {
	var name = cname + "=";
	var decodedCookie = decodeURIComponent(document.cookie);
	var ca = decodedCookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
}

function writeToDatabase(path, key, value) {

}