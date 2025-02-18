const tg = Telegram.WebApp;

export function useTg() {
  const user = tg.initDataUnsafe.user;

  const cloudStorage = tg.CloudStorage;

  const hapticFeedback = tg.HapticFeedback;

  const invoice = tg.openInvoice;

  return {
    tg,
    user,
    cloudStorage,
    hapticFeedback,
    invoice
  };
}
