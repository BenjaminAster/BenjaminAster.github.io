class ImgBox {
	constructor(number) {
		this.number = number
		this.type = "img";
		this.imgPath = wordChainImgPaths[this.number];
		this.img = loadImage(this.imgPath);
		this.name = wordChains[this.number];
		this.uSize = 3;
		this.size;
		this.ux = random(0, gridWidth - this.uSize);
		this.uy = random(0, height / width * gridWidth - this.uSize);
		this.x;
		this.y;
		this.moving = false;
		this.mouseRelX;
		this.mouseRelY;
	}

	update() {
		if (this.moving) {
			this.x = mouseX - this.mouseRelX;
			this.y = mouseY - this.mouseRelY;
			this.ux = this.x / this.size;
			this.uy = this.y / this.size;
			if (!mouseIsPressed) {
				this.moving = false;
			}
		}
	}

	show() {
		strokeWeight(1);
		stroke("black");
		image(this.img, this.x, this.y, this.size, this.size);
	}

	mouseTouching() {
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

	windowResized() {
		this.size = boxSize * this.uSize;
		this.x = this.ux * this.size;
		this.y = this.uy * this.size;
	}
}