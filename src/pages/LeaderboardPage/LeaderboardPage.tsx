import LeadersList from "../../components/LeadersList/LeadersList";
import "./LeaderboardPage.scss";

const LeaderboardPage = () => {
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
