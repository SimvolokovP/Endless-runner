import { ClipLoader } from "react-spinners";

import './LoadingScreen.scss';

const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      <ClipLoader size={64} color="#ffdc52" />
      <div className="loading-screen__title">Telegram Runner</div>
    </div>
  );
};

export default LoadingScreen;
