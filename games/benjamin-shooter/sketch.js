
let unit;
//let looping;

let shooter;

let score = 0;
//let gameOver = true;
let gameStates = {
	start: 0,
	playing: 1,
	pause: 2,
	gameOver: 3
}
let gameState = gameStates.start;

let interface;
let fontFamily;

let elementsLoaded = 0;
let elementsCount = 13;

// special utils:
let deodorant = null;
let prevDeodorant = -9999;
let deodorantSpan = 0;

let schoolbagElias = null;
let prevSchoolbagElias = -9999;
let schoolbagEliasSpan = 0;

let balls = [];
let enemies = [];
enemies.prevSpawn = 0;
enemies.randSpawnSpan = 0;
enemies.updateDisabled = false;

let frameRates = Array(32).fill(0);

let testNum = 0;
let bgImg;

let frameRate;

let imgPaths = {
	akadGym:
		"https://raw.githubusercontent.com/BenjaminAster/Benjamin-Aster/master/stuff/gallery/akadgym_dunkel_verschwommen.jpg",
	benjaminShooter:
		"https://raw.githubusercontent.com/BenjaminAster/Benjamin-Aster/master/stuff/gallery/benjamin_shooter_v03.png",
	benjaminShooterRH:
		"https://raw.githubusercontent.com/BenjaminAster/Benjamin-Aster/master/stuff/gallery/benjamin_shooter_v03_rechte_haelfte.png",
	satchFederpennal:
		"https://raw.githubusercontent.com/BenjaminAster/Benjamin-Aster/master/stuff/gallery/satch_federpennal.png",
	sophiaRund: function (num) {
		return `https://raw.githubusercontent.com/BenjaminAster/Benjamin-Aster/master/stuff/gallery/Sophia_${num}_rund.png`;
	},
	fog:
		"https://raw.githubusercontent.com/BenjaminAster/Benjamin-Aster/master/stuff/gallery/fog_2.png",
	deodorant:
		"https://raw.githubusercontent.com/BenjaminAster/Benjamin-Aster/master/stuff/gallery/deodorant_1.png",
	satchSchultasche:
		"https://raw.githubusercontent.com/BenjaminAster/Benjamin-Aster/master/stuff/gallery/satch_schultasche_2.png",
	elias:
		"https://raw.githubusercontent.com/BenjaminAster/Benjamin-Aster/master/stuff/gallery/elias_am_boxautomat_3.png",
};

let audioPaths = {

	willkommen:
		"https://raw.githubusercontent.com/BenjaminAster/Benjamin-Aster/master/stuff/audios/willkommen_beim_benjamin_shooter_1.mp4",
}

let imgs = {};
let audios = {};

function preload() {
}

function setup() {
	imgs.akadGym = loadImage(imgPaths.akadGym, successCallback = function () {
		elementsLoaded++;
		imgs.benjaminShooter = loadImage(imgPaths.benjaminShooter, successCallback = function () {
			elementsLoaded++;
			imgs.benjaminShooterRH = loadImage(imgPaths.benjaminShooterRH, successCallback = function () {
				elementsLoaded++;
				imgs.satchFederpennal = loadImage(imgPaths.satchFederpennal, successCallback = function () {
					elementsLoaded++;
					imgs.sophiaRund = [];
					imgs.sophiaRund[0] = loadImage(imgPaths.sophiaRund(1), successCallback = function () {
						elementsLoaded++;
						imgs.sophiaRund[1] = loadImage(imgPaths.sophiaRund(2), successCallback = function () {
							elementsLoaded++;
							imgs.sophiaRund[2] = loadImage(imgPaths.sophiaRund(3), successCallback = function () {
								elementsLoaded++;
								imgs.sophiaRund[3] = loadImage(imgPaths.sophiaRund(4), successCallback = function () {
									elementsLoaded++;
									imgs.fog = loadImage(imgPaths.fog, successCallback = function () {
										elementsLoaded++;
										imgs.deodorant = loadImage(imgPaths.deodorant, successCallback = function () {
											elementsLoaded++;
											imgs.satchSchultasche = loadImage(imgPaths.satchSchultasche, successCallback = function () {
												elementsLoaded++;
												imgs.elias = loadImage(imgPaths.elias, successCallback = function () {
													elementsLoaded++;
													audios.willkommen = loadSound(audioPaths.willkommen, successCallback = function () {
														elementsLoaded++;
														getAudioContext().suspend();
														audios.willkommen.play();
														audios.willkommen.setVolume(0.05);
													});
												});
											});
										});
									});
								});
							});
						});
					});
				});
			});
		});
	});


	createCanvas(windowWidth, windowHeight);


	if (navigator.appVersion.indexOf("Mac") != -1)
		fontFamily = "Trebuchet MS";
	else
		fontFamily = "Segoe UI";

	textFont(fontFamily);

	unit = int(min(width, height) / 100);

	{ interface = new Interface(); }

	windowResized();

	print("v31");


}

function draw() {
	background("black");

	if (frameCount % 16 < 2) {
		frameRates.push(int(getFrameRate()));
		frameRates.shift();
	}

	if (imgs.akadGym.height / imgs.akadGym.width < height / width) {
		image(imgs.akadGym, (width - height * imgs.akadGym.width / imgs.akadGym.height) / 2, 0,
			height * imgs.akadGym.width / imgs.akadGym.height, height);
	} else {
		image(imgs.akadGym, 0, (height - width * imgs.akadGym.height / imgs.akadGym.width) / 2,
			width, width * imgs.akadGym.height / imgs.akadGym.width);
	}



	if (gameState != gameStates.start) {
		if (frameCount - enemies.prevSpawn > enemies.randSpawnSpan && !enemies.updateDisabled) {
			enemies.randSpawnSpan = int(random(frameRate * 0.5, frameRate * 1.5));
			enemies.prevSpawn = frameCount;

			enemies.push(new Enemy());
			enemies[enemies.length - 1].setup();
		}

		shooter.update();

		for (let i = 0; i < enemies.length; i++) {
			if (!enemies.updateDisabled) {
				enemies[i].update();
				if (enemies[i].x > width) {
					gameState = gameStates.gameOver;
				}
			}
			enemies[i].show();
		}

		shooter.show(false);

		if (frameCount - shooter.shootSpan > shooter.prevShoot) {
			shooter.shoot();
		}

		for (let i = balls.length - 1; i >= 0; i--) {
			balls[i].update();
			balls[i].show();

			let collision = balls[i].checkCollision();
			if (collision != null) {
				enemies[collision].size -= unit * 4;
				if (enemies[collision].size <= unit * 8) {
					enemies.splice(collision, 1);
					if (gameState == gameStates.playing) score++;
				}
				balls.splice(i, 1);
			} else {
				balls[i].show();
			}
		}

		if (balls[0] != undefined && balls[0].x < -100) balls.shift();

		shooter.show(true);

		if (deodorant != null) {
			deodorant.update();
			deodorant.show();
		}
		if (schoolbagElias != null) {
			schoolbagElias.update();
			schoolbagElias.show();
		}

		if (gameState == gameStates.gameOver) {
			interface.show(gameStates.gameOver);
		} else if (gameState == gameStates.playing) {
			fill(255);
			stroke(0);
			strokeWeight(5);
			textSize(unit * 3);
			textAlign(LEFT, TOP);
			let infoString = `Sophias vernichtet: ${score}`;
			if (deodorant != null) {
				infoString += ` ● Deodorant (D): /`;
			} else if (frameCount - deodorantSpan >= prevDeodorant) {
				infoString += ` ● Deodorant (D): 0s`;
			} else {
				infoString += ` ● Deodorant (D): ${int((prevDeodorant + deodorantSpan - frameCount) / frameRate)}s`;
			}
			if (schoolbagElias != null) {
				infoString += ` ● Schultasche (S): /`;
			} else if (frameCount - schoolbagEliasSpan >= prevSchoolbagElias) {
				infoString += ` ● Schultasche (S): 0s`;
			} else {
				infoString += ` ● Schultasche (S): ${int((prevSchoolbagElias + schoolbagEliasSpan - frameCount) / frameRate)}s`;
			}

			text(infoString, unit, unit);
		}
	}

	if (gameState != gameStates.playing) {
		interface.show(gameState);
	}


	{ // text: © 2020 Benjamin Aster
		fill("white");
		stroke("black");
		strokeWeight(unit / 2);
		textSize(unit * 3);
		textAlign(LEFT, BOTTOM);
		text("© 2020 Benjamin Aster", unit / 1, height - unit / 2);
	}

	if (elementsLoaded != elementsCount) {
		textAlign(RIGHT, BOTTOM);
		let loadingBar = "[";
		for (let i = 0; i < elementsCount; i++) {
			(i < elementsLoaded) ? loadingBar = loadingBar + "▮" : loadingBar = loadingBar + "▯";
		}
		loadingBar = loadingBar + "]";
		text(`Loading media elements: ${loadingBar}`, width - unit, height - unit);
	}
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);

	unit = int(min(width, height) / 100);

	if (shooter != undefined) {
		shooter.windowResized();
	}

	interface.windowResized();
}

function keyPressed() {
	if (key == ' ') {
		if (gameState == gameStates.paused) {
			interface.playing();
		} else if (gameState == gameStates.playing) {
			interface.show(gameStates.paused);
		}
	}
	if (key == 'd' && deodorant == null && frameCount - deodorantSpan >= prevDeodorant) {
		deodorant = new Deodorant();
	}
	if (key == 's' && schoolbagElias == null && frameCount - schoolbagEliasSpan >= prevSchoolbagElias) {
		schoolbagElias = new SchoolbagElias();
	}
	if (key == 'm') {
		userStartAudio();
	}
}