import "./GameStats.scss";
import { FaMedal } from "react-icons/fa";
import { BiSolidFace } from "react-icons/bi";
import { FC } from "react";
import { useTg } from "../../hooks/useTg";
import { getUsername } from "../../helpers/getUsername";

interface GameStatsProps {
  isStart: boolean;
  record: number;
}

const GameStats: FC<GameStatsProps> = ({ isStart, record }) => {
  const { user } = useTg();

  
  return (
    <div className={isStart ? "game-stats game-stats--hide" : "game-stats"}>
      <div className="game-stats__item">
        <BiSolidFace />
        {user ? <span>{getUsername(user)}</span> : <span>Not User</span>}
      </div>
      <div className="game-stats__item">
        <FaMedal /> <span>{record}</span>
      </div>
    </div>
  );
};

export default GameStats;
