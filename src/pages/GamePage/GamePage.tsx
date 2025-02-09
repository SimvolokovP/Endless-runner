import { useState } from "react";
import Game from "../../components/Game/Game";

import "./GamePage.scss";

const GamePage = () => {
  const [isStart, setIsStart] = useState<boolean>(false);

  const handleStartToggle = () => {
    setIsStart(true);
    console.log(!isStart);
  };

  return (
    <section className="game-page">
      <div className="container game-page__container">
        <Game isStart={isStart} />
        {!isStart ? (
          <div className="game-page__start">
            <span>Play?</span>
            <button onClick={handleStartToggle}>start</button>
          </div>
        ) : (
          <></>
        )}
      </div>
    </section>
  );
};

export default GamePage;
