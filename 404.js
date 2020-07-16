
let unit;

//let notFoundStr = "THE PAGE YOU WERE LOOKING FOR WAS NOT FOUND";
let notFoundStr = "THE PAGE YOU WERE LOOKING FOR WAS NOT FOUND";
let easterEggStr = "EASTEREGG";
let boxSize;
let boxes = [];

let gridWidth = notFoundStr.length + 2;

let easterEggFound = false;

function setup() {
	createCanvas(windowWidth, windowHeight);

	for (let i = 0; i < notFoundStr.length; i++) {
		if (notFoundStr[i] != ' ') {
			boxes.push(new Box(notFoundStr[i], i));
		}
	}

	if (navigator.appVersion.indexOf("Mac") != -1)
		textFont("Trebuchet MS");
	else
		textFont("Segoe UI");

	windowResized();
}

function draw() {
	background(0x11);

	for (let i = boxes.length - 1; i >= 0; i--) {
		boxes[i].update();
		boxes[i].show();
	}

	for (let i in boxes) {
		let boxNr = i;
		let chain = boxes[i].letter;
		while (boxes[boxNr].rightNeighbor != null) {
			boxNr = boxes[boxNr].rightNeighbor;
			chain += boxes[boxNr].letter;
		}
		if (chain == easterEggStr) {
			easterEggFound = true;
		}
	}

	if (easterEggFound) {
		noStroke();
		fill(0, 0, 0, 0xbb);
		rect(0, 0, width, height);

		strokeWeight(unit / 3);
		stroke("black");
		fill("white");
		textAlign(CENTER, CENTER);
		textSize(unit * 4);
		text("Congratulations, you found the easter egg!\nThat won't help you in your later life.", width / 2, height / 2);
	}
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);

	unit = width / 100;
	boxSize = width / gridWidth;

	for (let i in boxes) {
		boxes[i].windowResized();
	}
}

function mousePressed() {
	for (let i in boxes) {
		if (boxes[i].mouseTouching()) {
			let dummy = boxes[i];
			boxes.splice(i, 1);
			boxes.unshift(dummy);
			break;
		}
	}
}