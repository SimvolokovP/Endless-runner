import "./GameStats.scss";
import { FaMedal } from "react-icons/fa";
import { BiSolidFace } from "react-icons/bi";
import { FC } from "react";

interface GameStatsProps {
  isStart: boolean;
  record: number;
}

const GameStats: FC<GameStatsProps> = ({ isStart, record }) => {
  return (
    <div className={isStart ? "game-stats game-stats--hide" : "game-stats"}>
      <div className="game-stats__item">
        <BiSolidFace />
        <span>max567746</span>
      </div>
      <div className="game-stats__item">
        <FaMedal /> <span>{record}</span>
      </div>
    </div>
  );
};

export default GameStats;
