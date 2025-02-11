import { FC, useState } from "react";
import Game from "../../components/Game/Game";

import "./GamePage.scss";

interface GamePageProps {
  isStart: boolean;
  setIsStart: (v: boolean) => void;
}

const GamePage: FC<GamePageProps> = ({ isStart, setIsStart }) => {
  return (
    <section className="game-page">
      <div className="container game-page__container">
        <Game isStart={isStart} setIsStart={setIsStart} />
        {!isStart ? (
          <div className="game-page__start">
            <span>Play?</span>
            <button onClick={() => setIsStart(true)}>start</button>
          </div>
        ) : (
          <></>
        )}
      </div>
    </section>
  );
};

export default GamePage;
