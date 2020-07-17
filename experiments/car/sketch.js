
let unit;

function setup() {
	createCanvas(windowWidth, windowHeight);

	windowResized();
}

function draw() {
	background(0);
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);

	unit = width / 100;
}