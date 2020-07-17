
let unit;

let notFoundStr = "THE PAGE YOU WERE LOOKING FOR WAS NOT FOUND";

let wordChains = [
	"EASTEREGG",
	"SNAKE",
	"PONG",
	"TETRIS",
	"SHOOTER",
	"REEEE",
	"TREE",
	"WATER",
	"SHEEP",
];
let wordChainTexts = [
	`Congratulations, you found the easter egg!<br>That won't help you in your later life.`,
	`You can play snake at<br><a href="https://benjaminaster.github.io/games/snake">benjaminaster.github.io/games/snake</a>`,
	`You can play pong at<br><a href="https://benjaminaster.github.io/games/pong">benjaminaster.github.io/games/pong</a>`,
	`You can play tetris at<br><a href="https://benjaminaster.github.io/games/tetris">benjaminaster.github.io/games/tetris</a>`,
	`You can play Benjamin Shooter at<br><a href="https://benjaminaster.github.io/games/benjamin-shooter">benjaminaster.github.io/games/benjamin-shooter</a>`,
	`REEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE`,
	`Wow, a tree!`,
	`I'm thirsty!`,
	`Look at this sheep!`,
];
let wordChainImgPaths = [
	`https://benjaminaster.github.io/gallery/egg.jpg`,
	`https://benjaminaster.github.io/gallery/snake.jpg`,
	`https://benjaminaster.github.io/gallery/pong.jpg`,
	`https://benjaminaster.github.io/gallery/tetris.jpg`,
	`https://benjaminaster.github.io/gallery/benjamin-shooter.jpg`,
	`https://benjaminaster.github.io/gallery/reeee.jpg`,
	`https://benjaminaster.github.io/gallery/tree.jpg`,
	`https://benjaminaster.github.io/gallery/water.jpg`,
	`https://benjaminaster.github.io/gallery/sheep.jpg`,
]

let wordChainFound = null;
let prevWordChainFound = null;

let boxSize;
let boxes = [];

let gridWidth = notFoundStr.length + 2;


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

	wordChainFound = null;
	for (let i in boxes) {
		let boxNr = i;
		let chain = boxes[i].letter;
		while (boxes[boxNr].rightNeighbor != null) {
			boxNr = boxes[boxNr].rightNeighbor;
			chain += boxes[boxNr].letter;
		}
		for (let j in wordChains) {
			if (chain == wordChains[j]) {
				wordChainFound = j;
			}
		}
	}

	if (!boxes[0].moving) {
		if (wordChainFound != null) {
			noStroke();
			fill(0, 0, 0, 0xbb);
			rect(0, 0, width, height);

			if (wordChainFound != prevWordChainFound) {
				document.getElementById("infotext").innerHTML = wordChainTexts[wordChainFound];
			}
			prevWordChainFound = wordChainFound;
		} else {
			document.getElementById("infotext").innerHTML = "";
		}

	} else {
		document.getElementById("infotext").innerHTML = "";
		prevWordChainFound = null;
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