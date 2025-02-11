import { FC, useEffect, useState } from "react";
import Game from "../../components/Game/Game";

import "./GamePage.scss";
import Button from "../../UI/Button/Button";

interface GamePageProps {
  isStart: boolean;
  setIsStart: (v: boolean) => void;
}

const GamePage: FC<GamePageProps> = ({ isStart, setIsStart }) => {
  const [score, setScore] = useState<number>(0);

  useEffect(() => {
    let scoreInterval = null;

    if (isStart) {
      scoreInterval = setInterval(() => {
        console.log(score);
        setScore((prevScore) => prevScore + 1);
      }, 1000);
    }

    return () => {
      if (scoreInterval) {
        clearInterval(scoreInterval);
      }
    };
  }, [isStart, score]);

  const handleStart = () => {
    setScore(0);
    setIsStart(true);
  };

  return (
    <section className="game-page">
      <div className="container game-page__container">
        <Game isStart={isStart} setIsStart={setIsStart} />
        {!isStart ? (
          <div className="game-page__start">
            {score > 0 ? <span>Your score: {score}</span> : <></>}
            <Button
              width={160}
              isLineAnimation={true}
              fs={24}
              handleClick={handleStart}
            >
              Start Game
            </Button>
          </div>
        ) : (
          <></>
        )}
        {isStart && <div className="game-page__score">{score}</div>}
      </div>
    </section>
  );
};

export default GamePage;
