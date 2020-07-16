function Box(letter, pos) {
	this.letter = letter;
	this.pos = pos;
	this.size;
	this.ux = pos + 1;
	this.uy = 1;
	this.x = this.ux * this.size;
	this.y = this.uy * this.size;
	this.col = "red";
	this.moving = false;
	this.mouseRelX;
	this.mouseRelY;
	this.rightNeighbor = null;

	this.update = function () {
		if (this.moving) {
			this.x = mouseX - this.mouseRelX;
			this.y = mouseY - this.mouseRelY;
			this.ux = this.x / this.size;
			this.uy = this.y / this.size;
			if (!mouseIsPressed) {
				this.moving = false;
			}
		}
		let numRightNeighbors = 0;
		for (let i in boxes) {
			if (
				boxes[i].ux > this.ux + 0.7 && boxes[i].ux < this.ux + (this.letter == "R" ? 2.3 : 1.3) &&
				boxes[i].uy > this.uy - 0.3 && boxes[i].uy < this.uy + 0.3
			) {
				this.rightNeighbor = i;
				numRightNeighbors++;
			}
		}
		if (numRightNeighbors != 1) {
			this.rightNeighbor = null;
		} else {
			//console.log(`Right neighbor of ${this.letter}: ${boxes[this.rightNeighbor].letter}`);
		}
	}

	this.show = function () {
		fill(this.col);
		strokeWeight(1);
		stroke("black");
		square(this.x, this.y, this.size);

		textAlign(CENTER, CENTER);
		textStyle(BOLD);
		textSize(this.size * 0.8);
		fill("black");
		noStroke();

		text(this.letter, this.x + this.size / 2, this.y + this.size * 0.56)
	}

	this.mouseTouching = function () {
		if (constrain(mouseX, this.x, this.x + this.size) == mouseX &&
			constrain(mouseY, this.y, this.y + this.size) == mouseY) {
			this.moving = true;
			this.mouseRelX = mouseX - this.x;
			this.mouseRelY = mouseY - this.y;
			return true;
		} else {
			return false;
		}
	}

	this.windowResized = function () {
		this.size = boxSize;
		this.x = this.ux * this.size;
		this.y = this.uy * this.size;
	}
}