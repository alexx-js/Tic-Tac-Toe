"use client";

import { useEffect, useState } from "react";
import Square from "@/components/Square";

const Board = () => {
  type Player = "X" | "O" | "both" | null;

  const [squares, setsquares] = useState(Array(9).fill(null));
  const [currentPlayer, setcurrentPlayer] = useState<"X" | "O">(
    Math.round(Math.random() * 1) === 1 ? "X" : "O"
  );
  const [winner, setwinner] = useState<Player>(null);
  const setSquaresValues = (index: number) => {
    const newData = squares.map((val, i) => {
      if (i === index) {
        return currentPlayer;
      }
      return val;
    });
    setsquares(newData);
    setcurrentPlayer(currentPlayer === "X" ? "O" : "X");
  };
  const resetBoard = () => {
    setsquares(Array(9).fill(null));
    setwinner(null);
    setcurrentPlayer(Math.round(Math.random() * 1) === 1 ? "X" : "O");
  };
  const theWinner = (squares: Player[]) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };

  useEffect(() => {
    const w = theWinner(squares);
    if (w) {
      setwinner(w);
    }

    if (!w && !squares.filter((square) => !square).length) {
      setwinner("both");
    }
  });

  return (
    <>
      <section id="board">
        <div className="buttons">
          <div
            className="button"
            id={currentPlayer === "X" ? "_" : "buttonActive"}
          >
            <span>X</span>
          </div>
          <div
            className="button"
            id={currentPlayer === "O" ? "_" : "buttonActive"}
          >
            <span>O</span>  
          </div>
        </div>
        <div className="boardGrid">
          {Array(9)
            .fill(null)
            .map((_, i) => {
              return (
                <Square
                  winner={winner}
                  key={i}
                  onClick={() => setSquaresValues(i)}
                  value={squares[i]}
                />
              );
            })}
        </div>
        <div className="boardGrid2">
                <div className="square" id={winner === null ? 'square1' : 'hiddenSquare'}></div>
                <div className="square" id={winner === null ? 'square2' : 'hiddenSquare'}></div>
                <div className="square" id={winner === null ? 'square3' : 'hiddenSquare'}></div>
                <div className="square" id={winner === null ? 'square4' : 'hiddenSquare'}></div>
                <div className="square" id={winner === null ? 'square5' : 'hiddenSquare'}></div>
                <div className="square" id={winner === null ? 'square6' : 'hiddenSquare'}></div>
                <div className="square" id={winner === null ? 'square7' : 'hiddenSquare'}></div>
                <div className="square" id={winner === null ? 'square8' : 'hiddenSquare'}></div>
                <div className="square" id={winner === null ? 'square9' : 'hiddenSquare'}></div>
        </div>
        <button id="reset" onClick={() => resetBoard()}>
          Reset
        </button>
      </section>
      {winner && winner !== "both" && <h2 className="winner">THE WINNER IS {winner}</h2>}
      {winner && winner === "both" && (<h2 className="winner">YOU'RE BOTH ARE WINNERS</h2>)}
    </>
  );
};

export default Board;