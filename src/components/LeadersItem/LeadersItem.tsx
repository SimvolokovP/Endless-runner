import { FC, useEffect, useState } from "react";
import { IUser } from "../../models/IUser";

import "./LeadersItem.scss";
import { User } from "@telegram-apps/types/dist/dts";
import { getUsername } from "../../helpers/getUsername";

interface LeadersItemProps {
  leaderIndex: number;
  leader: IUser;
}

const LeadersItem: FC<LeadersItemProps> = ({ leader, leaderIndex }) => {
  const [userInfo, setUserInfo] = useState<User | null>(null);

  useEffect(() => {
    const fetchUserInfos = async () => {
      if (!leader) {
        return;
      }

      try {
        const response = await fetch(
          `https://api.telegram.org/bot${
            import.meta.env.VITE_TG_TOKEN
          }/getChat?chat_id=${leader.tg_id}`
        );

        const data = await response.json();

        if (data.ok) {
          console.log(data);
          setUserInfo(data.result);
        } else {
          console.warn("Error fetching user info:", data.description);
          setUserInfo(null);
        }
      } catch (error) {
        console.warn("Network error:", error);
      }
    };

    fetchUserInfos();
  }, [leader]);

  const getBackgroundColor = (index: number) => {
    switch (index) {
      case 1:
        return "#ffdc52";
      case 2:
        return "#ddd7b7";
      case 3:
        return "#d88346";

      default:
        return "#738ca0";
    }
  };

  return (
    <li
      className="leaders-item"
      style={{ backgroundColor: getBackgroundColor(leaderIndex) }}
    >
      <div className="leaders-item__number">{leaderIndex}.</div>
      <div className="leaders-item__descr">
        {userInfo ? (
          <div className="leaders-item__name">{getUsername(userInfo)}</div>
        ) : (
          <div className="leaders-item__name">Unkown</div>
        )}
        <div className="leaders-item__record">{leader.record} pts.</div>
      </div>
    </li>
  );
};

export default LeadersItem;
