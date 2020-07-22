
let unit;

let grid;
let gridWidth = 10;
let gridHeight = 10;

function setup() {
	createCanvas(windowWidth, windowHeight);

	grid = Array(gridHeight).fill(0).map(x => Array(gridWidth).fill(false));

	windowResized();
}

function draw() {
	background(0);
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);

	unit = width / 100;
}