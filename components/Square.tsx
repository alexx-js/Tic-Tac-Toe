type Player = "X" | "O" | "both" | null;

type SquareParams = {
  winner: Player;
  value: Player;
  onClick: () => void;
};

function Square({ value, onClick, winner }: SquareParams) {
  if (!value) {
    return (
      <button className="square" onClick={onClick} disabled={Boolean(winner)} id={winner === null ? "_" : "boardGridHidden"}/>
    );
  }
  return (
    <button className={`square square_${value.toLocaleLowerCase()}`} disabled id={winner === null ? "_" : "boardGridHidden"}>{value}</button>
  );
}

export default Square;
