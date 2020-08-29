class GameOfLife {
	constructor() {
		this.gridWidth = 30;
		this.gridHeight = 30;
		this.grid = Array(this.gridHeight).fill(0).map(x => Array(this.gridWidth).fill(false));

		this.prevClm;
		this.prevRow;

		this.generationDelay = 0;
		this.prevGeneration = millis();
		this.paused = true;
	}

	mouse(pressed, shiftIsDown) {
		let cellX = floor(map(mouseX, vis.minX, vis.maxX, 0, this.gridWidth));
		let cellY = floor(map(mouseY, vis.minY, vis.maxY, 0, this.gridHeight));

		if (cellX >= 0 && cellX < this.gridWidth && cellY >= 0 && cellY < this.gridHeight) {
			if (pressed) {
				this.grid[cellY][cellX] = !shiftIsDown;
			}

			noStroke();
			fill(shiftIsDown ? "#ff000055" : "#00ff0055");
			rect(
				map(cellX, 0, this.gridWidth, vis.minX, vis.maxX),
				map(cellY, 0, this.gridHeight, vis.minY, vis.maxY),
				(vis.maxX - vis.minX) / this.gridWidth,
				(vis.maxY - vis.minY) / this.gridHeight);
		}


	}

	newGeneration() {
		this.prevGeneration = millis();

		let oldGrid = [];

		for (let row = 0; row < this.gridHeight; row++) {
			oldGrid.push(Array.from(this.grid[row]));
		}




		let neighborCoordinates = [
			{ x: 1, y: 0 },
			{ x: 1, y: 1 },
			{ x: 0, y: 1 },
			{ x: -1, y: 1 },
			{ x: -1, y: 0 },
			{ x: -1, y: -1 },
			{ x: 0, y: -1 },
			{ x: 1, y: -1 },
		];

		for (let row = 0; row < this.gridHeight; row++) {
			for (let clm = 0; clm < this.gridWidth; clm++) {

				let neighbors = 0;

				for (let i in neighborCoordinates) {
					let nbrX = clm + neighborCoordinates[i].x;  // nbr short for neighbor
					let nbrY = row + neighborCoordinates[i].y;

					if (oldGrid[(nbrY + this.gridHeight) % this.gridHeight][(nbrX + this.gridWidth) % this.gridWidth]) {
						neighbors++;
					}

				}

				if (oldGrid[row][clm]) {
					if (neighbors < 2) {
						this.grid[row][clm] = false;
					} else if (neighbors > 3) {
						this.grid[row][clm] = false;
					}
				} else {
					if (neighbors == 3) {
						this.grid[row][clm] = true;
					}
				}
			}
		}
	}

	addRow(side) {
		if (side == "top") {
			this.grid.unshift(new Array(this.gridWidth).fill(false));
			this.gridHeight++;
		} else if (side == "bottom") {
			this.grid.push(new Array(this.gridWidth).fill(false));
			this.gridHeight++;
		} else if (side == "left") {
			this.grid.forEach((value) => value.unshift(false));
			this.gridWidth++;
		} else if (side == "right") {
			this.grid.forEach((value) => value.push(false));
			this.gridWidth++;
		}
		vis.fitFrame();
		console.log(`grid size: ${this.gridWidth}*${this.gridHeight}`);
	}

	deleteRow(side) {
		if (side == "top") {
			this.grid.shift();
			this.gridHeight--;
		} else if (side == "bottom") {
			this.grid.pop();
			this.gridHeight--;
		} else if (side == "left") {
			this.grid.forEach((value) => value.shift());
			this.gridWidth--;
		} else if (side == "right") {
			this.grid.forEach((value) => value.pop());
			this.gridWidth--;
		}
		vis.fitFrame();
		console.log(`grid size: ${this.gridWidth}*${this.gridHeight}`);
	}
}