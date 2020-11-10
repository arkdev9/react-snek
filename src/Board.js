import Snek from "./Snek";

export default class Board {
  constructor() {
    this.boardDim = 30;
    this.grid = [];
    this.snek = new Snek(this.boardDim);
    this.snekDir = "right";
    this.dirMap = { 37: "left", 38: "up", 39: "right", 40: "down" };
    // Get a fresh board
    for (let y = 0; y < this.boardDim; y++) {
      let newrow = [];
      for (let x = 0; x < this.boardDim; x++) {
        newrow.push({
          snek: false,
          food: false,
        });
      }
      this.grid.push(newrow);
    }
    // Initial snek position set manually on the grid
    this.grid[this.snek.positions[0].y][this.snek.positions[0].x].snek = true;
    // Some food to start off
    this.grid[7][8].food = true;
  }

  gameLoop(TICK) {
    const moved = this.snek.moveSnek(this.snekDir, this.grid);
    if (moved.collision === "bounds") {
      this.endGame(moved.collision);
      return false;
    }
    if (moved.collision === "snek") {
      // out bounds or moved into self, stop ticker
      this.endGame(moved.collision);
      return false;
    }
    if (moved.collision === "food") {
      // Add a nother random food onto the grid
      // Make sure the food doesn't fall on an existing snek block
      // Pick a random index, pick the first free block iterating through
      // all the grid. If no free block, end game
      let rXIdx = Math.floor(Math.random() * this.boardDim);
      let rYIdx = Math.floor(Math.random() * this.boardDim);
      for (let y = rYIdx; y !== rYIdx - 1; y++) {
        for (let x = rXIdx; x !== rXIdx - 1; x++) {
          if (!this.grid[y][x].snek) {
            this.grid[y][x].food = true;
            return TICK * (1 - 0.3 / this.snek.positions.length);
          }
        }
      }

      // If didn't return yet
      this.endGame("Full grid");
      return false;
    }
    return TICK;
  }

  endGame(why) {
    console.trace();
    alert(`Game Over: ${why}`);
    clearInterval(this.gameLoop);
  }

  handleKey(e) {
    if (e.keyCode in this.dirMap) {
      console.log(`Clicked: ${e.keyCode} - ${this.dirMap[e.keyCode]}`);
      // Don't allow opposites
      this.snekDir = this.dirMap[e.keyCode];
    }
  }
}
