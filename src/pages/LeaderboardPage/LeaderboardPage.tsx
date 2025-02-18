import { useTg } from "../../hooks/useTg";
import LeadersList from "../../components/LeadersList/LeadersList";
import "./LeaderboardPage.scss";
import { useEffect } from "react";

const LeaderboardPage = () => {
  const { backBtn } = useTg();

  useEffect(() => {
    backBtn.show();
  }, []);

  return (
    <div className="leaderboard-page">
      <div className="container leaderboard-page__container">
        <h3 className="leaderboard-page__title">Leaders List</h3>
        <LeadersList />
      </div>
    </div>
  );
};

export default LeaderboardPage;
