
let unit;

let notFoundStr = "THE PAGE YOU WERE LOOKING FOR WAS NOT FOUND";

let foundChains = [null];

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
	"FISH",
	"GUY",
	"TEA",
	"GIRL",
	"TIGER",
	"DOG",
	"GOAT",
	"HORSE",
	"DEER",
	"WHALE",
	"SEA",
	"ROAD",
	"PRESIDENT",
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
	`Blub, blub.`,
	`Just some random guy.`,
	`Green tea or black tea?`,
	`It's a girl!`,
	`Don't let him kill you!`,
	`His name is puppy!`,
	`Look at these horns!`,
	`Almost a unicorn.`,
	`Deer, deer, oh dear, oh dear, your career as a deer is over here.`,
	`He could eat your whole body if he would want to.`,
	`Take your submarine and look at it.`,
	`I'm gonna take my horse to the old town road.`,
	`Make America stupid again!`,
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
	`https://benjaminaster.github.io/gallery/fish.jpg`,
	`https://benjaminaster.github.io/gallery/guy.jpg`,
	`https://benjaminaster.github.io/gallery/tea.jpg`,
	`https://benjaminaster.github.io/gallery/girl.jpg`,
	`https://benjaminaster.github.io/gallery/tiger.jpg`,
	`https://benjaminaster.github.io/gallery/dog.jpg`,
	`https://benjaminaster.github.io/gallery/goat.jpg`,
	`https://benjaminaster.github.io/gallery/horse.jpg`,
	`https://benjaminaster.github.io/gallery/deer.jpg`,
	`https://benjaminaster.github.io/gallery/whale.jpg`,
	`https://benjaminaster.github.io/gallery/sea.jpg`,
	`https://benjaminaster.github.io/gallery/road.jpg`,
	`https://benjaminaster.github.io/gallery/trump.jpg`,
]

let wordChainFound = null;
let prevWordChainFound = null;

let boxSize;
let boxes = [];

let gridWidth = notFoundStr.length + 2;


let testImgBox;


function setup() {
	createCanvas(windowWidth, windowHeight);

	for (let i = 0; i < notFoundStr.length; i++) {
		if (notFoundStr[i] != ' ') {
			boxes.push(new LetterBox(notFoundStr[i], i));
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
		/*
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
		*/
		if (document.getElementById("infotext").innerHTML != "") {
			noStroke();
			fill(0, 0, 0, 0xbb);
			rect(0, 0, width, height);
		}

		if (!foundChains.includes(wordChainFound)) {
			foundChains.push(wordChainFound);
			boxes.push(new ImgBox(wordChainFound));
			//boxes[0].windowResized();
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

function doubleClicked() {
	for (let i in boxes) {
		if (boxes[i].type == "img" && boxes[i].mouseTouching()) {
			boxes[i].doubleClicked();
			break;
		}
	}
}