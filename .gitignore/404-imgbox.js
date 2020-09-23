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
		this.uy = random(0, (height / width) * gridWidth - this.uSize);
		this.x;
		this.y;
		this.moving = false;
		this.mouseRelX;
		this.mouseRelY;
		this.windowResized();
	}

	update() {
		if (this.moving) {
			this.x = mouseX - this.mouseRelX;
			this.y = mouseY - this.mouseRelY;
			this.ux = this.x / boxSize;
			this.uy = this.y / boxSize;
			if (!mouseIsPressed) {
				this.moving = false;
			}
		}
	}

	show() {
		noStroke();
		fill("white");
		square(this.x - 1, this.y - 1, this.size + 2);
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

	doubleClicked() {
		document.getElementById("infotext").innerHTML = wordChainTexts[this.number];
	}

	windowResized() {
		this.size = boxSize * this.uSize;
		this.x = this.ux * boxSize;
		this.y = this.uy * boxSize;
	}
}