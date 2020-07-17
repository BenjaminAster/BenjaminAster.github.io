class LetterBox {
	constructor(letter, pos) {
		this.type = "letter";
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
	}

	update () {
		if (this.moving) {
			this.x = mouseX - this.mouseRelX;
			this.y = mouseY - this.mouseRelY;
			this.ux = this.x / this.size;
			this.uy = this.y / this.size;
			if (!mouseIsPressed) {
				this.moving = false;
			}
		}
		this.rightNeighbor = null;
		for (let i in boxes) {
			if (
				boxes[i].type == "letter" &&
				boxes[i].ux > this.ux + 0.7 && boxes[i].ux < this.ux + 2.3 &&
				boxes[i].uy > this.uy - 0.3 && boxes[i].uy < this.uy + 0.3
			) {
				if (this.rightNeighbor == null || boxes[i].x < boxes[this.rightNeighbor].x) {
					this.rightNeighbor = i;
				}
			}
		}
	}

	show () {
		fill(this.col);
		strokeWeight(1);
		stroke("black");
		square(this.x, this.y, this.size);

		textAlign(CENTER, CENTER);
		textStyle(BOLD);
		textSize(this.size * 0.8);
		fill("black");
		noStroke();

		text(this.letter, this.x + this.size / 2, this.y + this.size * 0.56);
	}

	mouseTouching () {
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

	windowResized () {
		this.size = boxSize;
		this.x = this.ux * this.size;
		this.y = this.uy * this.size;
	}
}