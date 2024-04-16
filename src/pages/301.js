import Dart from "@/components/Dart";
import { useEffect, useState } from "react";

export default function Game301() {
  const [height, setHeight] = useState();
  const [width, setWidth] = useState();
  const [player1Points, setPlayer1Points] = useState(301);
  const [player2Points, setPlayer2Points] = useState(301);
  const [activePlayer, setActivePlayer] = useState(false);
  const [limitOversize, setLimitOversize] = useState(false);

  useEffect(() => {
    if (typeof document !== "undefined") {
      const content = document.getElementById("content");
      if (content) {
        setHeight(content.offsetHeight);
        setWidth(content.offsetWidth);
      }
    }
  }, []);

  const updatePoints = (points) => {
    if (points === -1) {
      setLimitOversize(true);
      setActivePlayer(!activePlayer);
      return;
    }
    if (activePlayer) {
      setPlayer2Points(player2Points - points);
    } else {
      setPlayer1Points(player1Points - points);
    }
    setActivePlayer(!activePlayer);
  };

  const resetGame = () => {
    setPlayer1Points(301);
    setPlayer2Points(301);
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
    <>
      <div className="xl:hidden w-full h-screen flex items-center justify-center">
        <p>This game is not available for this screen.</p>
      </div>
      <div id="content" className="hidden xl:block relative w-full h-screen">
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
        {height && width && (
          <Dart
            updatePoints={updatePoints}
            playerScore={activePlayer ? player2Points : player1Points}
            height={height}
            width={width}
          />
        )}
      </div>
    </>
  );
}
