import Dart from "@/components/Dart";
import { useEffect, useState } from "react";

export default function Game501() {
  const [player1Points, setPlayer1Points] = useState(501);
  const [player2Points, setPlayer2Points] = useState(501);
  const [activePlayer, setActivePlayer] = useState(false);
  const [limitOversize, setLimitOversize] = useState(false);

  const updatePoints = (points) => {
    if (points === 0) {
      setLimitOversize(true);
    }
    if (activePlayer) {
      setPlayer2Points(player2Points - points);
    } else {
      setPlayer1Points(player1Points - points);
    }
    setActivePlayer(!activePlayer);
  };

  const resetGame = () => {
    setPlayer1Points(501);
    setPlayer2Points(501);
    setActivePlayer(!activePlayer);
  };

  useEffect(() => {
    if (limitOversize) {
      const timer = setTimeout(() => {
        setLimitOversize(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [limitOversize]);

  useEffect(() => {
    if (player1Points === 0) {
      alert("Winner of the game is player one");
      resetGame();
    }
    if (player2Points === 0) {
      alert("Winner of the game is player two");
      resetGame();
    }
  }, [player1Points, player2Points]);

  return (
    <div id="content" className="relative w-full h-full">
      <p className="absolute pointer-events-none z-20 text-4xl top-12 left-12">
        Turn: Player {activePlayer ? "two" : "one"}
        <br />
        <br />
        {limitOversize ? "Limit exceeded " : ""}
      </p>
      <p className="absolute pointer-events-none z-20 text-4xl top-12 right-12">
        Player one points: {player1Points}
        <br />
        Player two points: {player2Points}
      </p>
      <Dart
        player={activePlayer}
        updatePoints={updatePoints}
        playerScore={activePlayer ? player2Points : player1Points}
      />
    </div>
  );
}
