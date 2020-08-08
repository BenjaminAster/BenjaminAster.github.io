class Game {
	constructor() {
		this.gridUWid = 4;
		this.gridUHei = 4;
		this.grid = Array(this.gridUHei).fill().map(x => Array(this.gridUWid).fill(null));
		this.grid[2][3] = new Tile(3, 2, 1);
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
					this.grid[row][clm].windowResized();
				}
			}
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

		for (let row in this.grid) {
			for (let clm in this.grid[0]) {
				if (this.grid[row][clm] != null) {
					this.grid[row][clm].show();
				}
			}
		}
	}
}

let game;