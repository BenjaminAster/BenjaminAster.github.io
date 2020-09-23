class Game {
	constructor() {
		this.gridUWid = 4;
		this.gridUHei = 4;
		this.grid = Array(this.gridUHei).fill().map(x => Array(this.gridUWid).fill(null));

		this.animationTime = 400;
		this.tileSet = false;
		this.deletedTiles = [];
		this.animationFinished = true;

		this.dirArray = [];
	}

	windowResized() {
		this.unit = width / 100;

		this.gridPHei = min(height, width * this.gridUHei / this.gridUWid);
		this.gridPWid = min(width, height * this.gridUWid / this.gridUHei);

		this.tileSize = this.gridPWid / this.gridUWid;
		this.border = this.tileSize / 20;
		this.borderRadius = this.tileSize / 14;

		for (let row in this.grid) {
			for (let clm in this.grid[0]) {
				if (this.grid[row][clm] != null) {
					this.grid[row][clm].update();
				}
			}
		}
	}

	newTile() {
		let emptySpots = 0;
		for (let row in this.grid) {
			for (let clm in this.grid[0]) {
				if (this.grid[row][clm] == null) {
					emptySpots++;
				}
			}
		}
		if (emptySpots == 0) {
			//console.log("game over");
			this.grid = Array(this.gridUHei).fill().map(x => Array(this.gridUWid).fill(null));
			this.newTile();
		} else {
			let randX, randY;
			do {
				randX = int(random(0, this.gridUWid));
				randY = int(random(0, this.gridUHei));
			} while (this.grid[randY][randX] != null)
			let startPowerOf2 = (random() < 0.5) ? 1 : 2;
			this.grid[randY][randX] = new Tile(randX, randY, startPowerOf2);
		}
	}

	draw() {
		noStroke();
		fill(0x22);
		rect(0, 0, this.gridPWid, this.gridPHei);

		for (let row in this.grid) {
			for (let clm in this.grid[0]) {
				noStroke();
				fill(0x11);
				rect(clm * this.tileSize + this.border,
					row * this.tileSize + this.border,
					this.tileSize - this.border * 2,
					this.tileSize - this.border * 2,
					this.borderRadius);
			}
		}

		this.animationFinished = true;

		for (let row in this.grid) {
			for (let clm in this.grid[0]) {
				if (this.grid[row][clm] != null) {
					this.grid[row][clm].show(false);
					this.animationFinished = this.grid[row][clm].isAnimationFinished() && this.animationFinished;
					if (this.grid[row][clm].isAnimationFinished() && this.grid[row][clm].changeNumber) {
						this.grid[row][clm].powerOf2++;
						this.grid[row][clm].changeNumber = false;
					}
				}
			}
		}

		for (let i = this.deletedTiles.length - 1; i >= 0; i--) {
			this.animationFinished = this.deletedTiles[i].isAnimationFinished() && this.animationFinished;
			if (this.deletedTiles[i].isAnimationFinished()) {
				this.deletedTiles.splice(i, 1);
			} else {
				this.deletedTiles[i].show(false);
			}
		}


		if (this.animationFinished && !this.tileAdded) {
			this.newTile();
			this.tileAdded = true;
		}

		for (let row in this.grid) {
			for (let clm in this.grid[0]) {
				if (this.grid[row][clm] != null) {
					this.grid[row][clm].show(true);
				}
			}
		}
		for (let i in this.deletedTiles) {
			this.deletedTiles[i].show(true);
		}
	}

	swipe(dir) {
		if (this.animationFinished) {
			let gridTiles;
			function updateGridTile(clm, row) {
				game.grid[row][clm].move(clm, row);
			}
			if (dir == "up" || dir == "down") {
				gridTiles = Array(this.gridUWid);

				for (let clm in this.grid[0]) {
					gridTiles[clm] = [];
					for (let row in this.grid) {
						if (this.grid[row][clm] != null) {
							gridTiles[clm].push(this.grid[row][clm]);
						}
					}
				}
				this.grid = Array(this.gridUHei).fill().map(x => Array(this.gridUWid).fill(null));
				for (let clm = 0; clm < gridTiles.length; clm++) {
					let prevPowerOf2 = 0;
					for (let row = gridTiles[clm].length - 1; row >= 0; row--) {
						if (gridTiles[clm][row].powerOf2 == prevPowerOf2) {
							this.deletedTiles.unshift(new Tile(gridTiles[clm][row].uX, gridTiles[clm][row].uY, gridTiles[clm][row].powerOf2));
							this.deletedTiles[0].siblingTile = gridTiles[clm][row + 1];
							gridTiles[clm].splice(row, 1);
							gridTiles[clm][row].changeNumber = true;
							prevPowerOf2 = 0;
						} else {
							prevPowerOf2 = gridTiles[clm][row].powerOf2;
						}
					}

					for (let row = 0; row < gridTiles[clm].length; row++) {
						if (dir == "up") {
							this.grid[row][clm] = gridTiles[clm][row];
							updateGridTile(clm, row);
						} else {
							this.grid[this.gridUHei - gridTiles[clm].length + row][clm] = gridTiles[clm][row];
							updateGridTile(clm, this.gridUHei - gridTiles[clm].length + row);
						}
					}

				}
			}

			if (dir == "left" || dir == "right") {
				gridTiles = Array(this.gridUHei);

				for (let row in this.grid) {
					gridTiles[row] = [];
					for (let clm in this.grid[0]) {
						if (this.grid[row][clm] != null) {
							gridTiles[row].push(this.grid[row][clm]);
						}
					}
				}
				this.grid = Array(this.gridUHei).fill().map(x => Array(this.gridUWid).fill(null));
				for (let row = 0; row < gridTiles.length; row++) {
					let prevPowerOf2 = 0;
					for (let clm = gridTiles[row].length - 1; clm >= 0; clm--) {
						if (gridTiles[row][clm].powerOf2 == prevPowerOf2) {
							this.deletedTiles.unshift(new Tile(gridTiles[row][clm].uX, gridTiles[row][clm].uY, gridTiles[row][clm].powerOf2));
							this.deletedTiles[0].siblingTile = gridTiles[row][clm + 1];
							gridTiles[row].splice(clm, 1);
							gridTiles[row][clm].changeNumber = true;
							prevPowerOf2 = 0;
						} else {
							prevPowerOf2 = gridTiles[row][clm].powerOf2;
						}
					}

					for (let clm = 0; clm < gridTiles[row].length; clm++) {
						if (dir == "left") {
							this.grid[row][clm] = gridTiles[row][clm];
							updateGridTile(clm, row);
						} else {
							this.grid[row][this.gridUWid - gridTiles[row].length + clm] = gridTiles[row][clm];
							updateGridTile(this.gridUWid - gridTiles[row].length + clm, row);
						}
					}
				}
			}

			for (let i in this.deletedTiles) {
				this.deletedTiles[i].move(this.deletedTiles[i].siblingTile.uX, this.deletedTiles[i].siblingTile.uY);
			}

			//console.log(gridTiles, dir);
			this.tileAdded = false;
		}
	}

	addRow(side) {
		if (side == "bottom") {
			this.grid.push(Array(this.gridUWid).fill(null));
			this.gridUHei++;
		} else if (side == "top") {
			for (let row of this.grid) {
				for (let tile of row) {
					if (tile) {
						tile.uY++;
						tile.prevUY++;
					}
				}
			}
			this.grid.unshift(Array(this.gridUWid).fill(null));
			this.gridUHei++;
		} else if (side == "right") {
			for (let row of this.grid) {
				row.push(null);
			}
			this.gridUWid++;
		} else if (side == "left") {
			for (let row of this.grid) {
				for (let tile of row) {
					if (tile) {
						tile.uX++;
						tile.prevUX++;
					}
				}
				row.unshift(null);
			}
			this.gridUWid++
		}
		windowResized();
	}

}

let game;