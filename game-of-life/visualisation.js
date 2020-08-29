class Visualisation {

	constructor() {
		this.minX = 0;
		this.maxX = height * gol.gridWidth / gol.gridHeight;
		this.minY = 0;
		this.maxY = height;
		this.zoomNum = 1;

		this.dragging = false;
		this.dragDivisor = 1;
	}

	draw() {

		if (this.dragging) {
			this.minX += movedX / this.dragDivisor;
			this.maxX += movedX / this.dragDivisor;
			this.minY += movedY / this.dragDivisor;
			this.maxY += movedY / this.dragDivisor;
		}

		for (let row = 0; row < gol.gridHeight; row++) {
			for (let clm = 0; clm < gol.gridWidth; clm++) {
				if (gol.grid[row][clm]) {
					fill(0xff);
					//strokeWeight(this.zoomNum * unit / 32);
					//stroke(0x00);
					noStroke();
					rect(
						map(clm, 0, gol.gridWidth, this.minX, this.maxX),
						map(row, 0, gol.gridHeight, this.minY, this.maxY),
						(this.maxX - this.minX) / gol.gridWidth,
						(this.maxY - this.minY) / gol.gridHeight);

				}
				else if ((row + clm) % 2 == 0) {
					fill(0x16);
					noStroke();
					rect(
						map(clm, 0, gol.gridWidth, this.minX, this.maxX),
						map(row, 0, gol.gridHeight, this.minY, this.maxY),
						(this.maxX - this.minX) / gol.gridWidth,
						(this.maxY - this.minY) / gol.gridHeight);
				}
			}
		}
	}

	zoom(zoom) {
		let zoomFactor = zoom;
		this.zoomNum *= zoomFactor;


		this.minX = mouseX - (mouseX - this.minX) * zoomFactor;
		this.maxX = mouseX + (this.maxX - mouseX) * zoomFactor;

		this.minY = mouseY - (mouseY - this.minY) * zoomFactor;
		this.maxY = mouseY + (this.maxY - mouseY) * zoomFactor;


		/*
		this.minX = mouseX - zoomNum*width;
		this.maxX = 
		*/
	}

	drag(bYes, shiftIsDown) {
		if (bYes) {
			this.dragging = true;
			this.dragDivisor = (shiftIsDown ? 5 : 1);
			/*
			this.dragStartMinX = this.minX;
			this.dragStartMaxX = this.maxX;
			this.dragStartMinY = this.minY;
			this.dragStartMaxY = this.maxY;
			*/
		} else {
			this.dragging = false;
		}
	}

	fitFrame() {
		this.minX = 0;
		this.maxX = height * gol.gridWidth / gol.gridHeight;
		this.minY = 0;
		this.maxY = height;
	}
}