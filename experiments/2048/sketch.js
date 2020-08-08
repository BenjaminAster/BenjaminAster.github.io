function setup() {
	createCanvas(windowWidth, windowHeight);

	game = new Game();

	windowResized();
}

function draw() {
	background(0);
	
	game.draw();
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);

	game.windowResized();
}