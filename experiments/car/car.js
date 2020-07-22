class Car {
	constructor() {
		this.x = width / 2;
		this.y = height / 2;
		this.v = 0;
		this.acc = unit / 10;
		this.dec = unit / 50;
		this.rot = PI / 2;
		this.moving = null;

		this.width = unit * 3;
		this.height = unit * 7;
	}

	move(forward) {
		if (forward == true) {
			this.v += this.acc;
			this.moving = "forward";
		} else if (forward == false) {
			this.v -= this.acc;
			this.moving = "backward";
		}
	}

	update() {
		if (this.moving == "forward") {
			this.v -= this.dec;
			if (this.v <= 0) {
				this.moving = null;
				this.v = 0;
			}
		} else if (this.moving == "backward") {
			this.v += this.dec;
			if (this.v >= 0) {
				this.moving = null;
				this.v = 0;
			}
		}
		this.x -= cos(this.rot) * this.v;
		this.y -= sin(this.rot) * this.v;

		//this.moving = null;
	}

	show() {
		push();
		translate(this.x, this.y);
		rotate(this.rot);
		rectMode(CENTER);
		fill("white");
		noStroke();
		rect(0, 0, this.height, this.width);
		pop();
	}
}