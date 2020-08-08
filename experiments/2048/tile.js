class Tile {
	constructor(uX, uY, startPowerOf2) {
		this.uX = uX;
		this.uY = uY;
		this.prevUX = this.uX;
		this.prevUY = this.uY;
		this.powerOf2 = startPowerOf2;
		//this.number = pow(2, this.powerOf2);
		this.animationState = 1.0;
		this.update();
	}

	isAnimationFinished() {
		return this.animationState == 1;
	}

	update() {
		this.pX = this.uX * game.tileSize;
		this.pY = this.uY * game.tileSize;
		this.pWid = game.tileSize;
		this.pHei = game.tileSize;
	}

	move(uX, uY) {
		this.prevUX = this.uX;
		this.prevUY = this.uY;
		this.uX = uX;
		this.uY = uY;
		this.pX = this.uX * game.tileSize;
		this.pY = this.uY * game.tileSize;
		this.animationState = 0.0;
	}

	show() {
		if (this.animationState != 1.0) {
			this.animationState += 1000 / frameRate() / game.animationTime;
			this.animationState = constrain(this.animationState, 0, 1);
			this.pX = lerp(this.prevUX, this.uX, this.animationState) * game.tileSize;
			this.pY = lerp(this.prevUY, this.uY, this.animationState) * game.tileSize;
		}
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
		text(pow(2, this.powerOf2), this.pX + game.tileSize / 2, this.pY + game.tileSize / 2);
	}
}