import { useEffect, useState } from "react";
import { IUser } from "../../models/IUser";
import UserService from "../../api/supabaseApi/usersApi";

import "./LeadersList.scss";
import LeadersItem from "../LeadersItem/LeadersItem";
import { ClipLoader } from "react-spinners";

const LeadersList = () => {
  const [leaders, setLeaders] = useState<IUser[]>([]);

  useEffect(() => {
    const fetchLeaders = async () => {
      const targetLeaders = await UserService.getUsersByRecord();
      setLeaders(targetLeaders);
    };

    fetchLeaders();
  }, []);

  return (
    <>
      {leaders.length ? <ul className="list-reset leaders-list">
        {leaders.map((leader, index) => (
          <LeadersItem
            key={leader.id}
            leader={leader}
            leaderIndex={index + 1}
          />
        ))}
      </ul> : <ClipLoader color="#ffdc52" />}
    </>
  );
};

export default LeadersList;
