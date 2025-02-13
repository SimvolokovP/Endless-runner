import {
  init,
  initData,
  mainButton,
  miniApp,
  themeParams,
  viewport,
} from "@telegram-apps/sdk-react";

const initTg = () => {
  init();

  miniApp.mount();
  mainButton.mount();
  themeParams.mount();
  initData.restore();

  viewport
    .mount()
    .catch((e) => {
      console.error("Ошибка монтирования viewport", e);
    })
    .then(() => {
      viewport.expand();
      viewport.bindCssVars();
    });

  miniApp.bindCssVars();
  themeParams.bindCssVars();
};

export default initTg;
