

function Shooter() {
	this.x;
	this.y;
	this.mouthPos = { x: 0.5, y: 0.745 };
	this.size;
	this.powerModeEnabled = false;

	this.prevShoot = frameCount;
	this.shootSpan = frameRate * 2 / 4;

	this.windowResized = function () {
		this.size = unit * 30;
		this.x = width * 7 / 8;
		this.sizeScaleFactor = this.size / imgs.benjaminShooter.width;
	}

	this.update = function () {
		this.y = mouseY;
	}

	this.show = function (onlyRightHalf) {
		let absX = this.x - this.mouthPos.x * this.size;
		let absY = this.y - this.mouthPos.y * this.size;
		let imgDummy = (onlyRightHalf) ? imgs.benjaminShooterRH : imgs.benjaminShooter;
		image(imgDummy, absX, absY, this.sizeScaleFactor * imgDummy.width, this.sizeScaleFactor * imgDummy.height);
	}

	this.shoot = function () {

		balls.push(new Ball( /*this.x, this.y,*/ this.powerModeEnabled));
		this.prevShoot = frameCount;
	}

	this.powerMode = function (enable) {
		this.powerModeEnabled = enable;
		this.shootSpan *= (enable) ? 1 / 6 : 6;
	}
}


