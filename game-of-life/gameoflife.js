class GameOfLife {
	constructor() {
		this.gridWidth = 100;
		this.gridHeight = 100;
		this.grid = Array(this.gridHeight).fill(0).map(x => Array(this.gridWidth).fill(false));

		this.prevClm;
		this.prevRow;

		this.generationDelay = 250;
		this.prevGeneration = millis();
		this.paused = true;
	}

	mousePressed() {
		let cellX = int(map(mouseX, vis.minX, vis.maxX, 0, this.gridWidth));
		let cellY = int(map(mouseY, vis.minY, vis.maxY, 0, this.gridHeight));

		if (cellX >= 0 && cellX < this.gridWidth && cellY >= 0 && cellY < this.gridHeight) {
			this.grid[cellY][cellX] = !this.grid[cellY][cellX];
		}
	}

	newGeneration() {
		if (millis() - this.prevGeneration >= this.generationDelay && !this.paused) {
			this.prevGeneration = millis();

			let oldGrid = [];


			
			for (let row = 0; row < this.gridHeight; row++) {
				oldGrid.push(Array(this.gridWidth));
				//oldGrid[row] = Array(this.gridWidth);
				for (let clm = 0; clm < this.gridWidth; clm++) {
					oldGrid[row][clm] = this.grid[row][clm];
				}
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

						if (nbrX >= 0 && nbrX < this.gridWidth && nbrY >= 0 && nbrY < this.gridHeight) {
							if (oldGrid[nbrY][nbrX]) {
								neighbors++;
							}
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
	}
}