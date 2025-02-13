import {
  init,
  initData,
  miniApp,
  viewport,

} from "@telegram-apps/sdk-react";

const initTg = () => {
  init();

  miniApp.mount();
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

};

export default initTg;
