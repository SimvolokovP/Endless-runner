import { FC, useEffect, useState } from "react";
import Player from "../Player/Player";
import "./Game.scss";
import { gamePositions } from "../../models/player";
import Ground from "../Ground/Ground";
import Obstacle from "../Obstacle/Obstacle";
import { isCollision } from "../../helpers/collisionHelpers";
import useSkinStore from "../../store/useSkinStore";

interface GameProps {
  isStart: boolean;
  setIsStart: (v: boolean) => void;
  score: number;
  record: number;
  setIsNewRecord: (v: boolean) => void;
  setRecord: (n: number) => void;
  updateUserRecord: (n: number) => void;
}

const Game: FC<GameProps> = ({
  isStart,
  setIsStart,
  score,
  record,
  setIsNewRecord,
  setRecord,
  updateUserRecord,
}) => {
  const [currentPosition, setCurrentPosition] = useState(1);
  const [playerRect, setPlayerRect] = useState<DOMRect | null>(null);
  const [obstacleRect, setObstacleRect] = useState<DOMRect[] | null>(null);

  const playerSkin = useSkinStore((state) => state.currentSkin);

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
    if (!isStart) return;
    movePlayer(event.key);
  };

  let touchStartX: number = 0;
  let touchEndX: number = 0;

  const handleTouchStart = (event: TouchEvent) => {
    touchStartX = event.touches[0].clientX;
  };

  const handleTouchMove = (event: TouchEvent) => {
    touchEndX = event.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!isStart) return;
    if (touchEndX < touchStartX) {
      movePlayer("ArrowLeft");
    }
    if (touchEndX > touchStartX) {
      movePlayer("ArrowRight");
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [currentPosition, isStart]);

  useEffect(() => {
    if (isStart && playerRect && obstacleRect) {
      if (obstacleRect.some((rect) => isCollision(playerRect, rect))) {
        setIsStart(false);
        setPlayerRect(null);
        setObstacleRect(null);

        if (score > record) {
          updateUserRecord(score);
          setIsNewRecord(true);
          setRecord(score);
        }
      }
    }
  }, [isStart, playerRect, obstacleRect, score, record]);

  return (
    <div className="game">
      {!isStart && <div className="game__gray"></div>}
      <Player
        position={currentPosition}
        skin={playerSkin}
        isStart={isStart}
        setPlayerRect={setPlayerRect}
      />
      <Ground speed={SPEED} isStart={isStart} />
      {isStart && (
        <Obstacle isStart={isStart} setObstacleRect={setObstacleRect} />
      )}
    </div>
  );
};

export default Game;
