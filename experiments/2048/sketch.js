function setup() {
	createCanvas(windowWidth, windowHeight);

	game = new Game();

	windowResized();

	game.newTile();
}

function draw() {
	background(0);
	
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