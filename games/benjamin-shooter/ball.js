

function Ball() {
	this.x = shooter.x
	this.y = shooter.y

	let img = {}
	img.img = imgs.satchFederpennal;

	img.h = unit * 4.6;
	img.w = img.h * img.img.width / img.img.height;

	this.size = unit * 6;
	this.vx = unit * 40 / frameRate;


	this.update = function () {
		this.x -= this.vx;
		if (this.x > shooter.x - unit * 7) {
			this.y = shooter.y;
		}

	}

	this.checkCollision = function () {
		for (let i = 0; i < enemies.length; i++) {
			if (dist(this.x, this.y, enemies[i].x, enemies[i].y) < enemies[i].size / 2) {
				return i;
			}
			if (dist(this.x, this.y - unit * 2, enemies[i].x, enemies[i].y) < enemies[i].size / 2) {
				return i;
			}
			if (dist(this.x, this.y + unit * 2, enemies[i].x, enemies[i].y) < enemies[i].size / 2) {
				return i;
			}
		}
		return null;
	}

	this.show = function () {
		image(img.img, this.x, this.y - img.h / 2, img.w, img.h);
	}
}


