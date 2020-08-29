
let unit;
let playerName = "";

function setup() {
	createCanvas(windowWidth, windowHeight);

	windowResized();

	database.getKeys("/multiplayer-test", (keys) => {
		playerName = `player-${keys.length}`;
	});

	database.on("/multiplayer-test", (data) => {
		background(0);
		if (data == null) {
			data = {};
		}
		for (let i of Object.keys(data)) {
			circle(data[i].x, data[i].y, 100);
		}
	})
}

function draw() {
	//background(0);

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
