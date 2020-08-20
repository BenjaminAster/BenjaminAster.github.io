
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
	`You can play snake at<br><a href="https://benjaminaster.com/snake">benjaminaster.com/snake</a>`,
	`You can play pong at<br><a href="https://benjaminaster.com/pong">benjaminaster.com/pong</a>`,
	`You can play tetris at<br><a href="https://benjaminaster.com/tetris">benjaminaster.com/tetris</a>`,
	`You can play Benjamin Shooter at<br><a href="https://benjaminaster.com/benjamin-shooter">benjaminaster.com/benjamin-shooter</a>`,
	`REEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE`,
	`Wow, a tree!`,
	`I'm thirsty!`,
	`Look at this sheep!`,
];
let wordChainImgPaths = [
	`https://benjaminaster.com/media/egg.jpg`,
	`https://benjaminaster.com/media/snake.jpg`,
	`https://benjaminaster.com/media/pong.jpg`,
	`https://benjaminaster.com/media/tetris.jpg`,
	`https://benjaminaster.com/media/benjamin-shooter.jpg`,
	`https://benjaminaster.com/media/reeee.jpg`,
	`https://benjaminaster.com/media/tree.jpg`,
	`https://benjaminaster.com/media/water.jpg`,
	`https://benjaminaster.com/media/sheep.jpg`,
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