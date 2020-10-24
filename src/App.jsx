import React from "react";

import Board from "./Board";
import "./App.css";

/*
  left arrow	37
  up arrow	38
  right arrow	39
  down arrow	40
*/

class App extends React.Component {
  constructor(props) {
    super(props);
    this.TICK = 200;
    this.board = new Board(this.TICK);
    this.state = {
      grid: this.board.grid,
    };

    this.ticker = this.getTicker(this.TICK);
  }

  getTicker() {
    return setInterval(() => {
      const newTick = this.board.gameLoop(this.TICK);
      if (!newTick) {
        this.clearTicker();
        return;
      }
      if (newTick !== this.TICK) {
        this.TICK = newTick;
        this.updateTicker(this.TICK);
      }
      this.setState({
        grid: this.board.grid,
      });
    }, this.TICK);
  }

  updateTicker(newTick) {
    clearInterval(this.ticker);
    this.ticker = this.getTicker(newTick);
  }

  clearTicker() {
    clearInterval(this.ticker);
  }

  componentDidMount() {
    document.addEventListener(
      "keydown",
      (e) => {
        this.board.handleKey(e);
      },
      false
    );
  }

  render() {
    return (
      <div className="container">
        <h1>Snek</h1>
        <div className="game-container">
          {this.state.grid.map((row, i) => (
            <div key={i} className="row">
              {row.map((sqr, j) => (
                <div
                  key={j}
                  className={`square ${sqr.snek && "snek"} ${
                    sqr.food && "food"
                  }`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
