import React from "react";

import Board from "./Board";
import "./App.css";

const TICK = 300;
/*
  left arrow	37
  up arrow	38
  right arrow	39
  down arrow	40
*/

class App extends React.Component {
  constructor(props) {
    super(props);
    this.board = new Board(TICK);
    this.state = {
      grid: this.board.grid,
    };
  }

  componentDidMount() {
    document.addEventListener(
      "keydown",
      (e) => {
        this.board.handleKey(e);
      },
      false
    );

    setInterval(() => {
      this.setState({
        grid: this.board.grid,
      });
    }, TICK);
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
