import { FC, useEffect, useState } from "react";
import Player from "../Player/Player";
import "./Game.scss";
import { gamePositions } from "../../models/player";
import Ground from "../Ground/Ground";

interface GameProps {
  isStart: boolean;
}

const Game: FC<GameProps> = ({ isStart }) => {
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
    console.log(isStart);
    if (!isStart) return;

    movePlayer(event.key);
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentPosition, isStart]);

  return (
    <div className="game">
      {!isStart && <div className="game__gray"></div>}
      <Player position={currentPosition} skin={playerSkin} isStart={isStart} />
      <Ground speed={SPEED} isStart={isStart} />
    </div>
  );
};

export default Game;
