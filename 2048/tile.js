class Tile {
	constructor(uX, uY, startPowerOf2) {
		this.uX = uX;
		this.uY = uY;
		this.prevUX = this.uX;
		this.prevUY = this.uY;
		this.powerOf2 = startPowerOf2;
		//this.number = pow(2, this.powerOf2);
		this.changeNumber = false;
		this.animationState = 1.0;
		this.animationTime = game.animationTime;
		this.update();

		this.siblingTile = null;
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
		//this.animationTime = dist(this.prevUX, this.prevUY, this.uX, this.uY) * game.animationTime;
	}

	show(drawNumber) {
		if (this.animationState != 1.0) {
			this.animationState += 1000 / frameRate() / this.animationTime;
			this.animationState = constrain(this.animationState, 0, 1);
			this.pX = lerp(this.prevUX, this.uX, this.animationState) * game.tileSize;
			this.pY = lerp(this.prevUY, this.uY, this.animationState) * game.tileSize;
		}
		if (!drawNumber) {
			noStroke();
			colorMode(HSB, 255);
			fill((this.powerOf2 * 35) % 256, 170, 255);
			colorMode(RGB, 255);
			rect(this.pX + game.border,
				this.pY + game.border,
				this.pWid - game.border * 2,
				this.pHei - game.border * 2,
				game.borderRadius);
		} else {
			noStroke();
			fill(0x00);
			textAlign(CENTER, CENTER);
			textStyle(BOLD);
			textSize(game.tileSize / 3);
			text(pow(2, this.powerOf2), this.pX + game.tileSize / 2, this.pY + game.tileSize / 2);
		}
	}
}