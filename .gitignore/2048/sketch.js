function setup() {
	createCanvas(windowWidth, windowHeight);

	game = new Game();

	windowResized();
}

function draw() {
	background(0);

	/*
	let randomDir = int(random(0, 20));
	if (randomDir == 0) {
		game.swipe("up");
	} else if (randomDir == 1) {
		game.swipe("down");
	} else if (randomDir == 2) {
		game.swipe("left");
	} else if (randomDir == 3) {
		game.swipe("right");
	}
	*/

	if (game.animationFinished && game.dirArray.length) {
		game.swipe(game.dirArray[0]);
		game.dirArray.shift();
	}

	game.draw();
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);

	game.windowResized();
}

function keyPressed() {
	if (keyIsDown(SHIFT)) {
		if (keyCode == UP_ARROW) {
			game.addRow("top");
		} else if (keyCode == DOWN_ARROW) {
			game.addRow("bottom");
		} else if (keyCode == LEFT_ARROW) {
			game.addRow("left");
		} else if (keyCode == RIGHT_ARROW) {
			game.addRow("right");
		}
	} else {
		if (keyCode == UP_ARROW) {
			game.dirArray.push("up");
		} else if (keyCode == DOWN_ARROW) {
			game.dirArray.push("down");
		} else if (keyCode == LEFT_ARROW) {
			game.dirArray.push("left");
		} else if (keyCode == RIGHT_ARROW) {
			game.dirArray.push("right");
		}
	}
}