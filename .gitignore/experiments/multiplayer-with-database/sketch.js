
let unit;
let playerNum = null;

function setup() {
	createCanvas(windowWidth, windowHeight);

	windowResized();

	database.getKeys("/multiplayer-test", (keys) => {
		playerNum = keys.length;
		database.write(`/multiplayer-test/player-${playerNum}`, {
			x: 0,
			y: 0,
		});
	});

	database.on("/multiplayer-test", (data) => {
		background(0);
		if (data == null) {
			data = {};
		}
		textAlign(CENTER, CENTER);
		textSize(unit * 4);
		let i = 0;
		for (let key of Object.keys(data)) {
			stroke(0xff);
			fill(0x00);
			circle(data[key].x, data[key].y, 100);
			noStroke();
			fill(0xff);
			text(i, data[key].x, data[key].y)
			i++;
		}
	})
}

function draw() {
	//background(0);

	if (mouseIsPressed && playerNum != null) {
		database.write(`/multiplayer-test/player-${playerNum}`, {
			x: int(mouseX),
			y: int(mouseY),
		});
	}
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);

	unit = width / 100;
}
