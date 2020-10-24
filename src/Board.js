var boardDim = 15;

class Snek {
  constructor() {
    this.positions = [
      {
        y: 0,
        x: 0,
      },
    ];
  }

  checkValidPos(newPos, grid) {
    if (newPos.x >= boardDim || newPos.x < 0) return false;
    if (newPos.y >= boardDim || newPos.y < 0) return false;
    return true;
  }

  moveSnek(direction, grid) {
    // Make the first element in positions null
    let newPos = {};
    if (direction === "right") {
      newPos = {
        y: this.positions[this.positions.length - 1].y,
        x: this.positions[this.positions.length - 1].x + 1,
      };
    }
    if (direction === "left") {
      newPos = {
        y: this.positions[this.positions.length - 1].y,
        x: this.positions[this.positions.length - 1].x - 1,
      };
    }
    if (direction === "up") {
      newPos = {
        y: this.positions[this.positions.length - 1].y - 1,
        x: this.positions[this.positions.length - 1].x,
      };
    }
    if (direction === "down") {
      newPos = {
        y: this.positions[this.positions.length - 1].y + 1,
        x: this.positions[this.positions.length - 1].x,
      };
    }

    // Check out of bounds
    let validMove = this.checkValidPos(newPos);
    if (!validMove) return false;

    // Check collisions
    let collisionInfo = "none";
    if (grid[newPos.y][newPos.x].food) {
      collisionInfo = "food";
    }
    if (grid[newPos.y][newPos.x].snek) {
      collisionInfo = "snek";
    }

    // If not moved into food, remove last snek block from grid
    if (collisionInfo === "none") {
      // Remove prev snek position from grid
      grid[this.positions[0].y][this.positions[0].x].snek = false;
    } else if (collisionInfo === "food") {
      grid[newPos.y][newPos.x].food = false;
    }
    // If moved into food, keep the last snek block, else remove it from new positions
    let newPositions = this.positions.slice(
      collisionInfo === "food" ? 0 : 1,
      this.positions.length
    );

    // Register new positions
    newPositions.push(newPos);
    this.positions = newPositions;

    // Update new position on grid
    grid[newPos.y][newPos.x].snek = true;

    return {
      collision: collisionInfo,
      grid: grid,
    };
  }
}

class Board {
  constructor(TICK) {
    this.grid = [];
    this.snek = new Snek();
    this.snekDir = "right";
    // Get a fresh board
    for (let y = 0; y < boardDim; y++) {
      let newrow = [];
      for (let x = 0; x < boardDim; x++) {
        newrow.push({
          snek: false,
          food: false,
        });
      }
      this.grid.push(newrow);
    }
    // Initial snek position set manually on the grid
    this.grid[this.snek.positions[0].y][this.snek.positions[0].x].snek = true;

    // Some random food
    this.grid[1][3].food = true;
    this.grid[4][3].food = true;
    this.grid[5][1].food = true;
    this.grid[4][6].food = true;
    this.grid[7][8].food = true;

    this.ticker = setInterval(() => {
      const moved = this.snek.moveSnek(this.snekDir, this.grid);
      if (!moved || moved.collision === "snek") {
        // out bounds or moved into self, stop ticker
        this.clearTicker();
      }
      if (moved.collision === "food") {
        // alert("moved into food");
      }
    }, TICK);
  }

  clearTicker() {
    clearInterval(this.ticker);
  }

  handleKey(e) {
    const dirMap = { 37: "left", 38: "up", 39: "right", 40: "down" };
    console.log(`Clicked: ${e.keyCode} - ${dirMap[e.keyCode]}`);
    this.snekDir = dirMap[e.keyCode];
  }
}

export default Board;
