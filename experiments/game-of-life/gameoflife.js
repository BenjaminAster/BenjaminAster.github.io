class GameOfLife {
	constructor() {
		this.gridWidth = 20;
		this.gridHeight = 10;
		this.grid = Array(this.gridHeight).fill(0).map(x => Array(this.gridWidth).fill(false));
	}
}