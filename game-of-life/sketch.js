let unit;


let gol;
let vis;

function setup() {
	createCanvas(windowWidth, windowHeight);

	gol = new GameOfLife();
	vis = new Visualisation();


	windowResized();

}

function draw() {
	background(0);

	vis.draw();

	if (mouseIsPressed && mouseButton == LEFT) {
		gol.mouse(true, keyIsDown(SHIFT));
	} else {
		gol.mouse(false, keyIsDown(SHIFT));
	}

	gol.newGeneration();
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);

	unit = width / 100;
}

function mouseWheel(event) {
	let divisor = 150 * ((keyIsDown(SHIFT)) ? 10 : 1);
	if (event.delta > 0) {
		vis.zoom(zoom = 1 / (1 + event.delta / divisor));
	} else {
		vis.zoom(zoom = (1 + -event.delta / divisor));
	}
}

function mousePressed() {
	if (mouseButton == CENTER) {
		vis.drag(true, keyIsDown(SHIFT));
	}
}

function mouseReleased() {
	if (mouseButton == CENTER) {
		vis.drag(false);
	}
}

function keyPressed() {
	if (key == ' ') {
		gol.paused = !gol.paused;
	} else if (key == 'f') {
		vis.fitFrame();
	}
}