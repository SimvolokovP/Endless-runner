import Game from "../../components/Game/Game";

import './GamePage.scss';

const GamePage = () => {
  return (
    <section className="game-page">
      <div className="container game-page__container">
        <Game />
      </div>
    </section>
  );
};

export default GamePage;
