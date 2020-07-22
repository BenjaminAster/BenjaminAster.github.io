
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
	`You can play snake at<br><a href="https://benjaminaster.github.io/snake">benjaminaster.github.io/snake</a>`,
	`You can play pong at<br><a href="https://benjaminaster.github.io/pong">benjaminaster.github.io/pong</a>`,
	`You can play tetris at<br><a href="https://benjaminaster.github.io/tetris">benjaminaster.github.io/tetris</a>`,
	`You can play Benjamin Shooter at<br><a href="https://benjaminaster.github.io/benjamin-shooter">benjaminaster.github.io/benjamin-shooter</a>`,
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
	`https://benjaminaster.github.io/media/egg.jpg`,
	`https://benjaminaster.github.io/media/snake.jpg`,
	`https://benjaminaster.github.io/media/pong.jpg`,
	`https://benjaminaster.github.io/media/tetris.jpg`,
	`https://benjaminaster.github.io/media/benjamin-shooter.jpg`,
	`https://benjaminaster.github.io/media/reeee.jpg`,
	`https://benjaminaster.github.io/media/tree.jpg`,
	`https://benjaminaster.github.io/media/water.jpg`,
	`https://benjaminaster.github.io/media/sheep.jpg`,
	`https://benjaminaster.github.io/media/fish.jpg`,
	`https://benjaminaster.github.io/media/guy.jpg`,
	`https://benjaminaster.github.io/media/tea.jpg`,
	`https://benjaminaster.github.io/media/girl.jpg`,
	`https://benjaminaster.github.io/media/tiger.jpg`,
	`https://benjaminaster.github.io/media/dog.jpg`,
	`https://benjaminaster.github.io/media/goat.jpg`,
	`https://benjaminaster.github.io/media/horse.jpg`,
	`https://benjaminaster.github.io/media/deer.jpg`,
	`https://benjaminaster.github.io/media/whale.jpg`,
	`https://benjaminaster.github.io/media/sea.jpg`,
	`https://benjaminaster.github.io/media/road.jpg`,
	`https://benjaminaster.github.io/media/trump.jpg`,
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
		if (document.getElementById("infotext").innerHTML != "") {
			noStroke();
			fill(0, 0, 0, 0xbb);
			rect(0, 0, width, height);
		}

		if (!foundChains.includes(wordChainFound)) {
			foundChains.push(wordChainFound);
			boxes.push(new ImgBox(wordChainFound));
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