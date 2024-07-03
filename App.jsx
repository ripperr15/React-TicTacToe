import { useState } from "react";
import Log from "./components/Log.jsx";
import Player from "./components/Player.jsx";
import GameBoard from "./components/GameBoard.jsx";
import { WINNING_COMBINATIONS } from "./components/WinningCombinations.jsx";
import GameOver from "./components/GameOver.jsx";

const PLAYERS = {
  X: "Player 1",
  O: "Player 2",
};

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTurns) {
  let currentPlayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }

  return currentPlayer;
}

function deriveWinner(gameBoard, playersss) {
  let winner = null;
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = playersss[firstSquareSymbol];
    }
  }

  return winner;
}

function App() {
  const [playersss, setPlayers] = useState(PLAYERS);

  const [gameTurns, updateGameTurns] = useState([]);

  const activePlayer = deriveActivePlayer(gameTurns);

  let gameBoard = [...initialGameBoard.map((array) => [...array])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  const winner = deriveWinner(gameBoard, playersss);

  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectPlayer(rowIndex, colIndex) {
    //  updateActivePlayer((curActivePlayer) =>
    //     curActivePlayer === "X" ? "O" : "X"
    //   );

    updateGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);
      const setTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];
      return setTurns;
    });
  }

  function handleRematch() {
    updateGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newNAme) {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newNAme,
      };
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            name={PLAYERS.X}
            symbol="X"
            isActive={activePlayer === "X"}
            onChangeName={handlePlayerNameChange}
          />
          <Player
            name={PLAYERS.O}
            symbol="O"
            isActive={activePlayer === "O"}
            onChangeName={handlePlayerNameChange}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} onRematch={handleRematch} />
        )}
        <GameBoard
          changingActivePlayer={handleSelectPlayer}
          board={gameBoard}
        />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
