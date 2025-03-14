import { useNavigate } from "react-router-dom";

const tg = Telegram.WebApp;

export function useTg() {
  const tgData = tg.initDataUnsafe;
  const user = tg.initDataUnsafe.user;

  const cloudStorage = tg.CloudStorage;

  const hapticFeedback = tg.HapticFeedback;

  const invoice = tg.openInvoice;

  const showMessage = (messgae: string) => {
    tg.showAlert(messgae);
  };

  // const navigate = useNavigate();

  // const navigateToGamePage = () => {
  //   navigate("/");
  // };

  const backBtn = tg.BackButton;

  // Telegram.WebApp.onEvent("backButtonClicked", navigateToGamePage);

  return {
    tg,
    user,
    cloudStorage,
    hapticFeedback,
    invoice,
    backBtn,
    tgData,
    showMessage,
  };
}
