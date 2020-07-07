function Enemy() {
	let overlapping = false;

	let vx;

	this.x;
	this.y;
	this.size;

	let img = imgs.sophiaRund[int(random(4))];

	this.setup = function () {
		do {
			overlapping = false;
			this.size = int(random(unit * 15, unit * 30));
			this.x = int(random(this.size / 2, width * 1 / 4 - this.size / 2));
			this.y = int(random(this.size / 2, height - this.size / 2));

			for (let i = 0; i < enemies.length - 1; i++) {
				if (dist(this.x, this.y, enemies[i].x, enemies[i].y) < this.size / 2 + enemies[i].size / 2 + unit * 3) {
					overlapping = true;
				}
			}

		} while (overlapping)
	}


	this.update = function () {
		vx = unit * (10 + frameCount / frameRate / 20) / frameRate;
		this.x += vx;
	}

	this.show = function () {
		noStroke();
		(this.x > width * 6 / 8 && millis() % 600 < 300) ? fill("red") : fill("white");
		ellipseMode(CENTER);
		circle(this.x, this.y, this.size);
		let imgSize = this.size - unit;
		image(img, this.x - imgSize / 2, this.y - imgSize / 2, imgSize, imgSize);
	}
}