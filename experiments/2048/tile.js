class Tile {
	constructor(uX, uY, startPowerOf2) {
		this.uX = uX;
		this.uY = uY;
		this.powerOf2 = startPowerOf2;
		this.number = pow(2, this.powerOf2);
	}

	windowResized() {
		this.pX = this.uX * game.tileSize;
		this.pY = this.uY * game.tileSize;
		this.pWid = game.tileSize;
		this.pHei = game.tileSize;
	}

	show() {
		noStroke();
		fill("orange");
		rect(this.pX + game.border,
			this.pY + game.border,
			this.pWid - game.border * 2,
			this.pHei - game.border * 2,
			game.borderRadius);

		noStroke();
		fill(0x00);
		textAlign(CENTER, CENTER);
		textStyle(BOLD);
		textSize(game.tileSize / 3);
		text(pow(2, this.powerOf2), (this.uX + 0.5) * game.tileSize, (this.uY + 0.5) * game.tileSize);
	}
}