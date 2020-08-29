
let unit;
let playerName = "";

function setup() {
	createCanvas(windowWidth, windowHeight);

	windowResized();

	database.getKeys("/multiplayer-test", (keys) => {
		playerName = `player-${keys.length}`;
	});

	database.on("/multiplayer-test", () => {
		
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