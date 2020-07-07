
let unit;
//let looping;

let shooter;

let score = 0;
let highScore;
let cookies;
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
		"https://benjaminaster.github.io/gallery/akadgym_dunkel_verschwommen.jpg",
	benjaminShooter:
		"https://benjaminaster.github.io/gallery/benjamin_shooter_v03.png",
	benjaminShooterRH:
		"https://benjaminaster.github.io/gallery/benjamin_shooter_v03_rechte_haelfte.png",
	satchFederpennal:
		"https://benjaminaster.github.io/gallery/satch_federpennal.png",
	sophiaRund: function (num) {
		return `https://benjaminaster.github.io/gallery/sophia_${num}_rund.png`;
	},
	fog:
		"https://benjaminaster.github.io/gallery/fog_2.png",
	deodorant:
		"https://benjaminaster.github.io/gallery/deodorant_1.png",
	satchSchultasche:
		"https://benjaminaster.github.io/gallery/satch_schultasche_2.png",
	elias:
		"https://benjaminaster.github.io/gallery/elias_am_boxautomat_3.png",
	matisse:
		"https://benjaminaster.github.io/gallery/matisse_turban_1.png",
	megaphone:
		"https://benjaminaster.github.io/gallery/megaphone_1.png",
};

let audioPaths = {

	willkommen:
		"https://benjaminaster.github.io/audios/willkommen_beim_benjamin_shooter_1.ogg",
}

let imgs = {};
let audios = {};
let volume = 0.5;

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
														masterVolume(volume);
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

	cookies = new Cookies();
	highScore = cookies.getCookie("highScore");

	(highScore == "") ? highScore = 0 : highScore = parseInt(highScore);

	if (navigator.appVersion.indexOf("Mac") != -1)
		fontFamily = "Trebuchet MS";
	else
		fontFamily = "Segoe UI";

	textFont(fontFamily);

	unit = int(min(width, height) / 100);

	{ interface = new Interface(); }

	windowResized();


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
				if (enemies[i].x > width && schoolbagElias == null) {
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
					if (gameState == gameStates.playing) {
						score++;
						if (score > highScore) {
							highScore = score;
							cookies.setCookie("highScore", str(highScore), 365);

						}
					}
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
		}

		fill(255);
		stroke(0);
		strokeWeight(5);
		textSize(unit * 3);
		textAlign(LEFT, TOP);
		let infoString = "";
		print(score, highScore);
		infoString += (score == highScore) ? `Neuer High Score: ${score}` : `Score: ${score} ● High Score: ${highScore}`;

		if (deodorant != null) {
			infoString += ` ● Deo (D): ${isNaN(deodorant.getRemTime()) ? "✖" : deodorant.getRemTime() + "s"}`;
		} else if (frameCount - deodorantSpan >= prevDeodorant) {
			infoString += ` ● Deo (D): ✔`;
		} else {
			infoString += ` ● Deo (D): ${ceil((prevDeodorant + deodorantSpan - frameCount) / frameRate)}s`;
		}
		if (schoolbagElias != null) {
			infoString += ` ● Schultasche (S): ✖`;
		} else if (frameCount - schoolbagEliasSpan >= prevSchoolbagElias) {
			infoString += ` ● Schultasche (S): ✔`;
		} else {
			infoString += ` ● Schultasche (S): ${ceil((prevSchoolbagElias + schoolbagEliasSpan - frameCount) / frameRate)}s`;
		}

		text(infoString, unit, unit);
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
		textAlign(CENTER, TOP);
		textSize(unit * 6);
		let loadingBar = "[";
		for (let i = 0; i < elementsCount; i++) {
			(i < elementsLoaded) ? loadingBar = loadingBar + "▮" : loadingBar = loadingBar + "▯";
		}
		loadingBar = loadingBar + "]";
		text(loadingBar, width / 2, height * 10 / 16);
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
		(audios.willkommen.isPlaying()) ? audios.willkommen.pause() : audios.willkommen.play();
	}
	if (key == '+') {
		volume *= 1.2
		volume = constrain(volume, 0, 1);
		masterVolume(volume);
	}
	if (key == '-') {
		volume /= 1.2
		volume = constrain(volume, 0, 1);
		masterVolume(volume);
	}
}
