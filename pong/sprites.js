function Racket(side) {
	this.side = side;
	if (this.side == "left") {
		this.x = width / 10;
	} else {
		this.x = width / 10 * 9;
	}

	this.size = height / 8;
	this.y = (height - this.size) / 2;
	this.weight = unit * 2;
	this.col = color(255);
	this.speed = unit * 1;

	this.draw = function () {

		stroke(this.col);
		strokeWeight(this.weight);
		line(this.x, this.y, this.x, this.y + this.size);

		/*
		stroke("#f44");
		strokeWeight(2);
		(this.side == "left") ?
			line(this.x + this.weight / 2 + ball.weight / 2, this.y,
				this.x + this.weight / 2 + ball.weight / 2, this.y + this.size) :
			line(this.x - this.weight / 2 - ball.weight / 2, this.y,
				this.x - this.weight / 2 - ball.weight / 2, this.y + this.size);
		*/

	}

	this.move = function (dir) {
		this.speed = unit * (1 + score / 25);

		this.y += dir * this.speed;
		this.y = constrain(this.y, 0, height - this.size);
	}
}


function Ball() {
	this.x = width / 2;
	this.y = height / 2;
	this.prevX = this.x;
	this.prevY = this.y;

	this.weight = unit * 8;
	this.col = color(255);
	this.img = loadImage("https://raw.githubusercontent.com/BenjaminAster/Benjamin-Aster/master/stuff/ball.png");
	this.rot = 0;
	this.rotDelta = 0.02;

	this.speed = unit * 0.8;
	let dir = random(-PI / 32, PI / 32);
	this.vX = cos(dir) * this.speed;
	this.vY = sin(dir) * this.speed;

	this.update = function () {
		/*
		this.x += cos(this.dir) * this.speed;
		this.y += sin(this.dir) * this.speed;
		*/

		//print(this.vX, this.vY, this.speed);

		this.x += this.vX;
		this.y += this.vY;
		this.rot += this.rotDelta;
		this.speed = unit * (0.8 + score / 20);

		let rightBorder = rightRacket.x - rightRacket.weight / 2 - this.weight / 2;
		let leftBorder = leftRacket.x + leftRacket.weight / 2 + this.weight / 2;

		if (this.x >= rightBorder && this.prevX < rightBorder) {
			let intersectionY = lerp(this.prevY, this.y, norm(rightBorder, this.prevX, this.x));
			if (intersectionY == constrain(intersectionY,
				rightRacket.y - ball.weight / 2,
				rightRacket.y + ball.weight / 2 + rightRacket.size)
			) {
				score++;
				this.rotDelta = random(-0.03, 0.03);

				this.x = rightBorder;
				this.y = intersectionY;
				let dir = random(3 * QUARTER_PI, 5 * QUARTER_PI);
				this.vX = cos(dir) * this.speed;
				this.vY = sin(dir) * this.speed;
			}
		}
		else if (this.x <= leftBorder && this.prevX > leftBorder) {
			let intersectionY = lerp(this.prevY, this.y, norm(leftBorder, this.prevX, this.x));
			if (intersectionY == constrain(intersectionY,
				leftRacket.y - ball.weight / 2,
				leftRacket.y + ball.weight / 2 + leftRacket.size)
			) {
				score++;
				this.rotDelta = random(-0.03, 0.03);

				this.x = leftBorder;
				this.y = intersectionY;
				let dir = random(QUARTER_PI, -QUARTER_PI);
				this.vX = cos(dir) * this.speed;
				this.vY = sin(dir) * this.speed;
			}
		}
		else if (this.x < leftBorder || this.x > rightBorder) {
			gameOver = true;
		}


		/*
		else if (
			this.x < leftRacket.x + rightRacket.weight / 2 + this.weight / 2 &&
			this.y == constrain(this.y, leftRacket.y, leftRacket.y + leftRacket.size)
		) {
			let dir = random(3 * HALF_PI, 5 * HALF_PI);
			this.vX += cos(dir) * this.speed;
			this.vY += sin(dir) * this.speed;
		}
		*/

		if (this.y > height - this.weight / 2) {
			this.vY = -this.vY;
		}
		else if (this.y < this.weight / 2) {
			this.vY = -this.vY;
		}
		/*
		if (this.x < this.weight / 2) {
			this.vX = -this.vX;
		}
		*/

		this.prevX = this.x;
		this.prevY = this.y;
	}

	this.draw = function () {
		stroke(this.col);
		strokeWeight(this.weight);

		push();
		translate(this.x, this.y);
		rotate(this.rot);
		image(this.img, -this.weight / 2, -this.weight / 2, this.weight, this.weight);
		pop();



		/*
		stroke("#f44");
		strokeWeight(2);
		point(this.x, this.y);
		*/
	}
};

