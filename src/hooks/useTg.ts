const tg = Telegram.WebApp;

export function useTg() {
  const user = tg.initDataUnsafe.user;

  const cloudStorage = tg.CloudStorage

  return {
    tg,
    user,
    cloudStorage
  };
}
