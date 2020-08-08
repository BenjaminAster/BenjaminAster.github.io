class Game {
	constructor() {
		this.gridUWid = 4;
		this.gridUHei = 4;
		this.grid = Array(this.gridUHei).fill().map(x => Array(this.gridUWid).fill(null));

		this.animationTime = 100;
	}

	windowResized() {
		this.unit = width / 100;

		this.gridPWid = min(width, height);
		this.gridPHei = min(width, height);

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
		let randX, randY;
		do {
			randX = int(random(0, this.gridUWid));
			randY = int(random(0, this.gridUHei));
		} while (this.grid[randY][randX] != null)
		let startPowerOf2 = (random() < 0.5) ? 1 : 2;
		this.grid[randY][randX] = new Tile(randX, randY, startPowerOf2);
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

		for (let row in this.grid) {
			for (let clm in this.grid[0]) {
				if (this.grid[row][clm] != null) {
					this.grid[row][clm].show();
				}
			}
		}
	}

	swipe(dir) {
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
		this.newTile();
	}

}

let game;