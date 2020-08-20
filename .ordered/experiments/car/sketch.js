
let unit;

let car;

function setup() {
	createCanvas(windowWidth, windowHeight);

	windowResized();

	car = new Car()
}

function draw() {
	background(0);

	car.show();

	if (keyIsDown(UP_ARROW)) {
		car.move(true);
	} else if (keyIsDown(DOWN_ARROW)) {
		car.move(false);
	}
	car.update()
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);

	unit = width / 100;
}

function keyPressed() {
}