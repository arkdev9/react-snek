export default class Snek {
  constructor(boardDim) {
    this.boardDim = boardDim;
    this.positions = [
      {
        y: 0,
        x: 0,
      },
    ];
  }

  checkValidPos(newPos, grid) {
    if (newPos.x >= this.boardDim || newPos.x < 0) return false;
    if (newPos.y >= this.boardDim || newPos.y < 0) return false;
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
    if (!validMove)
      return {
        collison: "bounds",
        grid: grid,
      };

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
