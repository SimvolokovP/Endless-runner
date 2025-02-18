const tg = Telegram.WebApp;

export function useTg() {
  const user = tg.initDataUnsafe.user;

  const cloudStorage = tg.CloudStorage;

  const hapticFeedback = tg.HapticFeedback;

  const invoice = tg.openInvoice;

  const onInvoiceClosed = tg.onEvent("invoiceClosed", (inv) => {
    return inv;
  });

  return {
    tg,
    user,
    cloudStorage,
    hapticFeedback,
    invoice,
    onInvoiceClosed,
  };
}
