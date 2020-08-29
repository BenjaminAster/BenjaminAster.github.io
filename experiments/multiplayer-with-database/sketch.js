
let unit;
let playerName = "";

function setup() {
	createCanvas(windowWidth, windowHeight);

	windowResized();

	/*
	try {
		database.getKeys("/multiplayer-test", (keys) => {
			playerName = `player-${keys.length}`;
		});
	} catch {
		playerName = "player-0";
	}
	*/

	database.database.ref("/multiplayer-test").once("value", function (data) {
		console.log(data.val());
	})
}

function draw() {
	background(0);

	if (mouseIsPressed && playerName != "") {
		database.write(`/multiplayer-test/${playerName}`, {
			x: mouseX,
			y: mouseY,
		});
	}
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);

	unit = width / 100;
}