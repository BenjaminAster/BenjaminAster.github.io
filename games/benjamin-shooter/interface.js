

function Interface() {

	let restartBttn = createButton("Spiel starten");
	{
		restartBttn.id("restartButton");
		restartBttn.style("font-family", fontFamily);
		restartBttn.style("font-family", fontFamily);
		//restartBttn.position(0, 0);
		restartBttn.showing = false;

		restartBttn.mouseOver(function () {
			this.style("background-color", "white");
			this.style("color", "black");
		});
		restartBttn.mousePressed(function () {
			this.style("background-color", "transparent");
			this.style("color", "white");
			this.style("border-color", "transparent");
		});
		restartBttn.mouseOut(function () {
			this.style("background-color", "transparent");
			this.style("color", "white");
			this.style("border-color", "white");
		});

		//restartBttn.hide();
	}

	let pauseBttn = createButton("❚❚");
	//let pauseBttn = createButton("🔊");
	{
		pauseBttn.id("pauseButton");
		pauseBttn.style("font-family", fontFamily);
		pauseBttn.showing = false;

		pauseBttn.mouseOver(function () {
			this.style("background-color", "white");
			this.style("color", "black");
		});
		pauseBttn.mouseOut(function () {
			this.style("background-color", "transparent");
			this.style("color", "white");
			this.style("border-color", "white");
		});
		pauseBttn.mousePressed(function () {
			this.style("background-color", "transparent");
			this.style("color", "white");
			this.style("border-color", "transparent");
		})
		pauseBttn.mouseReleased(function () {
			this.style("background-color", "white");
			this.style("color", "black");

			if (gameState == gameStates.paused) {
				gameState = gameStates.playing;
				interface.playing();
			} else {
				gameState = gameStates.paused;
				interface.show(gameStates.paused);
			}
		});
	}

	this.windowResized = function () {
		restartBttn.show();
		restartBttn.size(width * 3 / 5, unit * 20);
		restartBttn.style("font-size", unit * 8 + "px");
		restartBttn.position(width / 2 - restartBttn.size().width / 2, height * 4 / 7);
		if (!restartBttn.showing) {
			restartBttn.hide();
		}

		pauseBttn.show();
		pauseBttn.size(unit * 6, unit * 6);
		pauseBttn.style("font-size", str(unit * 3) + "px");
		pauseBttn.position(width - pauseBttn.width - unit, unit);
		if (!pauseBttn.showing) {
			pauseBttn.hide();
		}
	}


	this.playing = function () {
		pauseBttn.show();
		pauseBttn.showing = true;
		pauseBttn.html("❚❚");
		pauseBttn.style("text-align", "center");
		restartBttn.hide();
		restartBttn.showing = false;
		gameState = gameStates.playing;
		loop();
	}

	this.show = function (when) { // when: either "start", "pauss" or "gameOver"


		textAlign(CENTER, TOP);

		restartBttn.mouseReleased(function () {

			/*
			let sum = 0;
			for (let i = 0; i < frameRates.length; i++) {
				sum += frameRates[i];
			}
			*/

			//let sum = frameRates.reduce((previous, current) => current += previous);
			frameRate = Math.max(...frameRates);

			if (gameState == gameStates.start) {
				shooter = new Shooter();
				shooter.windowResized();
			}
			gameState = gameStates.playing;
			score = 0;
			balls = [];
			shooter.prevShoot = frameCount;
			enemies = [];
			enemies.prevSpawn = frameCount;
			enemies.randSpawnSpan = frameRate;
			deodorant = null;
			deodorantSpan = frameRate * 30;
			schoolbagElias = null;
			schoolbagEliasSpan = frameRate * 30;
			interface.playing();
		});


		if (when != gameStates.start) {
			fill(0, 140);
			noStroke();
			rect(0, 0, width, height);
			restartBttn.show();
			restartBttn.showing = true;
			restartBttn.html("Neues Spiel starten");
		} else {
			strokeWeight(unit * 1);
			stroke("black");
			fill("white");
			textSize(unit * 7);
			text("Willkommen beim Benjamin Shooter!", width / 2, height * 5.7 / 16);
			textSize(unit * 3);
			text("Du wolltest schon immer mit Federpennalen auf eine Herde wilder Sophias schießen?\n" +
				"Dann geht dein Wunsch mit diesem Spiel nun in Erfüllung!\n" +
				"Du kannst das Spiel jederzeit mit Leertaste oder dem Button oben rechts pausieren.", width / 2, height * 7.0 / 16);
			if (elementsLoaded == elementsCount) {
				restartBttn.show();
				restartBttn.showing = true;
			}
		}

		if (when == gameStates.paused) {
			pauseBttn.show();
			pauseBttn.showing = true;
			pauseBttn.html("▶");
			//pauseBttn.html("🔊");
			pauseBttn.style("text-align", "center");
			gameState = gameStates.paused;
			strokeWeight(unit * 1);
			stroke("black");
			fill("white");
			textSize(unit * 7);
			text("Spiel pausiert!", width / 2, height * 5.6 / 16);
			textSize(unit * 3);
			text("Drücke die Leertaste oder klicke auf den Button oben rechts um fortzufahren.\n" +
				`Bisher hast du ${score} Sophias vernichtet\n` +
				"Wenn du das Spiel neu starten möchtest, klicke auf diesen Button ↓.", width / 2, height * 7.0 / 16);
			noLoop();
		} else {
			pauseBttn.hide();
			pauseBttn.showing = false;
		}

		if (when == gameStates.gameOver) {
			fill(255);
			stroke(0);
			strokeWeight(unit);
			textSize(unit * 3);
			textSize(unit * 10);
			text("Game Over!", width / 2, height * 6.2 / 16);
			textSize(unit * 3);
			let gameOverText = "";
			if (score == 0) {
				gameOverText = `Du hast leider keine einzige Sophia vernichtet. Vielleicht kriegst du ja das nächste mal welche.`;
			} else if (score == 1) {
				gameOverText = `Du hast leider nur eine Sophia vernichtet. Vielleicht schaffst du ja das nächste mal mehr.`;
			} else if (score < 10) {
				gameOverText = `Du hast leider nur ${score} Sophias vernichtet. Vielleicht schaffst du ja das nächste mal mehr.`;
			} else if (score < 100) {
				gameOverText = `Du hast ${score} Sophias vernichtet. Gut gemacht!`;
			} else {
				gameOverText = `Du hast ${score} Sophias vernichtet. Perfekt gemacht! Kann man dich irgendwo engagieren?`;
			}

			text(gameOverText, width / 2, height / 2 /* + unit * 3 */);
		}
	}
}

