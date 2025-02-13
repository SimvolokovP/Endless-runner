import { FC, useEffect, useState } from "react";
import Game from "../../components/Game/Game";

import "./GamePage.scss";
import Button from "../../UI/Button/Button";
import GameStats from "../../components/GameStats/GameStats";
import useUserStore from "../../store/useUserStore";
import { useTg } from "../../hooks/useTg";

interface GamePageProps {
  isStart: boolean;
  setIsStart: (v: boolean) => void;
}

const GamePage: FC<GamePageProps> = ({ isStart, setIsStart }) => {
  const [score, setScore] = useState<number>(0);
  const [record, setRecord] = useState<number>(0);
  const [isNewRecord, setIsNewRecord] = useState<boolean>(false);

  const { currentUser, updateUserRecord } = useUserStore();

  const { tg } = useTg();

  useEffect(() => {
    if (isStart) {
      tg.disableVerticalSwipes();
    } else {
      tg.enableVerticalSwipes();
    }
  }, [isStart]);

  useEffect(() => {
    if (currentUser?.record) {
      setRecord(+currentUser.record);
    }
  }, [currentUser]);

  useEffect(() => {
    let scoreInterval = null;

    if (isStart) {
      scoreInterval = setInterval(() => {
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
    setIsNewRecord(false);
    setIsStart(true);
  };

  return (
    <section className="game-page">
      <div className="container game-page__container">
        <Game
          isStart={isStart}
          setIsStart={setIsStart}
          record={record}
          setRecord={setRecord}
          score={score}
          setIsNewRecord={setIsNewRecord}
          updateUserRecord={updateUserRecord}
        />
        {!isStart ? (
          <div className="game-page__start">
            {isNewRecord ? (
              <span className="game-page__record">New Record!</span>
            ) : (
              <></>
            )}
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
        {<GameStats record={record} isStart={isStart} />}
      </div>
    </section>
  );
};

export default GamePage;
