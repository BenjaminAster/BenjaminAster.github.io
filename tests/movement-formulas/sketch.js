

let unit;

function setup() {
	createCanvas(windowWidth, windowHeight);

	windowResized();
}

function draw() {
	background(0x11);

	stroke("white");
	strokeWeight(unit);

	//point(width / 2, map(sin(sin(sin(sin(sin(sin(sin(sin(sin(sin(sin(sin(sin(sin(frameCount / 30)))))))))))))), 1, -1, unit, height - unit));
	point(width / 2, map(sin(sin(sin(frameCount / 50) * PI / 2) * PI / 2), 1, -1, unit, height - unit))
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);

	unit = width / 100;
}