let unit;


let gol;
let vis;

function setup() {
	createCanvas(windowWidth, windowHeight);

	gol = new GameOfLife();
	vis = new Visualisation();

	gol.grid[5][0] = true;

	windowResized();

}

function draw() {
	background(0);

	vis.draw();
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);

	unit = width / 100;
}

function mouseWheel(event) {
	if (event.delta > 0) {
		vis.zoom(zoom = 1 / (1 + event.delta / 150));
	} else {
		vis.zoom(zoom = (1 + -event.delta / 150));
	}
}

function mousePressed() {
	if (mouseButton == CENTER) {
		vis.drag(true);
	}
}

function mouseReleased() {
	if (mouseButton == CENTER) {
		vis.drag(false);
	}
}