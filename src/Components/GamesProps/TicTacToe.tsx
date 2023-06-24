import { useState } from "react";
import "../../CSS/GamesProps/TicTacToe.css";

// Define a functional component called 'TicTacToe'
const TicTacToe = () => {
  // Declare state variables
  const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null));
  const [player, setPlayer] = useState<string>("X");
  const [winner, setWinner] = useState<string | null>(null);

  // Handle a square click event
  const handleClick = (index: number) => {
    if (board[index] === null && winner === null) {
      let newBoard = [...board];
      newBoard[index] = player;
      setBoard(newBoard);
      setPlayer(player === "X" ? "O" : "X");
      checkWinner(newBoard);
    }
  };

  // Check if there is a winner or a draw
  const checkWinner = (board: (string | null)[]): void => {
    const winningLines: number[][] = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < winningLines.length; i++) {
      const [a, b, c] = winningLines[i];
      if (board[a] && board[a] === board[b] && board[b] === board[c]) {
        setWinner((prevWinner) => board[a] || prevWinner);
        return;
      }
    }
    if (!board.includes(null)) {
      setWinner((prevWinner) => (!board.includes(null) ? "draw" : prevWinner));
    }
  };

  // Reset the game
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setPlayer("X");
    setWinner(null);
  };

  // Render a square element
  const renderSquare = (index: number) => {
    return (
      <div className="square" onClick={() => handleClick(index)}>
        {board[index]}
      </div>
    );
  };

  // Render the Tic Tac Toe game board
  return (
    <div className="board">
      <div className="row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <div className="messageDiv">
        {winner && (
          <div className="message">
            {winner === "draw" ? "Draw!" : `Player ${winner} wins!`}
            <button className="play-again" onClick={() => resetGame()}>
              Play Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TicTacToe;
