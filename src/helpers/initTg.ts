const tg = Telegram.WebApp;

const initTg = () => {
  tg.disableVerticalSwipes();
  tg.exitFullscreen();
};

export default initTg;
