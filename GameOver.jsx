export default function GameOver({ winner, onRematch }) {
  return (
    <div id="game-over">
      <h2>GAME OVER!</h2>
      {winner && <p>{winner} is the CHAMPION</p>}
      {!winner && <p> Evenly Matched</p>}
      <p>
        <button onClick={onRematch}>Try Again</button>
      </p>
    </div>
  );
}
