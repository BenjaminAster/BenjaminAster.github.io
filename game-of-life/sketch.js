let unit;


let gol;
let vis;

function setup() {

	alert(`Scroll with mousewheel to zoom, Shift+Scroll with mousewheel to zoom slowly.${"\n"
		}Press mousewheel to drag, Shift+Press mousewheel to drag slowly.${"\n"
		}Click to add cells.${"\n"
		}Shift+Click to delete cells.${"\n"
		}Press Space to pause/play the Game of Life.${"\n"
		}Press D to do one Generation while in pause mode.${"\n"
		}Press F to fit the whole canvas onto the screen.`);


	createCanvas(windowWidth, windowHeight);

	gol = new GameOfLife();
	vis = new Visualisation();


	windowResized();

}

function draw() {
	background(0);

	vis.draw();

	if (mouseIsPressed && mouseButton == LEFT) {
		gol.mouse(true, keyIsDown(SHIFT));
	} else {
		gol.mouse(false, keyIsDown(SHIFT));
	}

	if (millis() - gol.prevGeneration >= gol.generationDelay && !gol.paused) {
		gol.newGeneration();
	}
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);

	unit = width / 100;
}

function mouseWheel(event) {
	let divisor = 150 * ((keyIsDown(SHIFT)) ? 10 : 1);
	if (event.delta > 0) {
		vis.zoom(zoom = 1 / (1 + event.delta / divisor));
	} else {
		vis.zoom(zoom = (1 + -event.delta / divisor));
	}
}

function mousePressed() {
	if (mouseButton == CENTER) {
		vis.drag(true, keyIsDown(SHIFT));
	}
}

function mouseReleased() {
	if (mouseButton == CENTER) {
		vis.drag(false);
	}
}

function keyPressed() {
	if (key == ' ') {
		gol.paused = !gol.paused;
	} else if (key == 'f') {
		vis.fitFrame();
	} else if (key == 'd') {
		gol.newGeneration();
	} else if (keyCode == UP_ARROW) {
		keyIsDown(SHIFT) ? gol.deleteRow("top") : gol.addRow("top");
	} else if (keyCode == DOWN_ARROW) {
		keyIsDown(SHIFT) ? gol.deleteRow("bottom") : gol.addRow("bottom");
	} else if (keyCode == LEFT_ARROW) {
		keyIsDown(SHIFT) ? gol.deleteRow("left") : gol.addRow("left");
	} else if (keyCode == RIGHT_ARROW) {
		keyIsDown(SHIFT) ? gol.deleteRow("right") : gol.addRow("right");
	}
}