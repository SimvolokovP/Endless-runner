import { useEffect, useState } from "react";
import Player from "../Player/Player";
import "./Game.scss";
import { gamePositions } from "../../models/player";
import Ground from "../Ground/Ground";

const Game = () => {
  const [currentPosition, setCurrentPosition] = useState(1);

  const [playerSkin, setPlayerSkin] = useState<string>("pavel");

  //   const speedScale = 1;
  const SPEED = 0.5;

  const movePlayer = (direction: string) => {
    if (
      direction === "ArrowRight" &&
      currentPosition < gamePositions.length - 1
    ) {
      setCurrentPosition((prev) => prev + 1);
    } else if (direction === "ArrowLeft" && currentPosition > 0) {
      setCurrentPosition((prev) => prev - 1);
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    movePlayer(event.key);
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentPosition]);

  return (
    <div className="game">
      <Player position={currentPosition} skin={playerSkin} />
      <Ground speed={SPEED} />
    </div>
  );
};

export default Game;
