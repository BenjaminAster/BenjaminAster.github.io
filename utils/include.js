function includeScript(path, sucessCallback) {
	let urls = {
		p5js: "https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.1.9/p5.js",
		p5jsSound: "https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.1.9/addons/p5.sound.js",
		//jQuery: "https://code.jquery.com/jquery-3.5.1.js",

		cookies: "https://benjaminaster.com/utils/cookies.js",
		//database: "https://benjaminaster.com/utils/database.js",
		database: "https://benjaminaster.com/utils/database.js",
	}

	try {
		path = eval(`urls.${path}`);
	} catch { }

	console.log(`including:`, path);

	$.getScript(path, function() {
		successCallback();
	});

	/*

	var imported = document.createElement("script");
	//imported.type = "text/javascript";
	imported.src = path;
	//imported.async = "false";
	imported.setAttribute("async", "false");
	document.head.appendChild(imported);
	*/
}