import "./GameStats.scss";
import { FaMedal } from "react-icons/fa";
import { BiSolidFace } from "react-icons/bi";
import { FC } from "react";
import { useTg } from "../../hooks/useTg";
import { User } from "@telegram-apps/types/dist/dts";

interface GameStatsProps {
  isStart: boolean;
  record: number;
}

const GameStats: FC<GameStatsProps> = ({ isStart, record }) => {
  const { user } = useTg();

  const getUsername = (tgUser: User) => {
    if (tgUser) {
      return (
        tgUser?.username ||
        `${tgUser?.first_name || ""} ${tgUser?.last_name || ""}`.trim()
      );
    }
    return "Unknown";
  };

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
