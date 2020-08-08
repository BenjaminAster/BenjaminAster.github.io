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
	
	game.draw();
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);

	game.windowResized();
}

function keyPressed() {
	if (keyCode == UP_ARROW) {
		game.swipe("up");
	} else if (keyCode == DOWN_ARROW) {
		game.swipe("down");
	} else if (keyCode == LEFT_ARROW) {
		game.swipe("left");
	} else if (keyCode == RIGHT_ARROW) {
		game.swipe("right");
	}
}