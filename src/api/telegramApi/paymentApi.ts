interface ISkinPayment {
  skinId: number;
  userId: number;
  amount: number
}

export class PaymentService {
  static async skinPay(paymentData: ISkinPayment) {
    const options: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: paymentData ? JSON.stringify(paymentData) : undefined,
    };
    console.log(paymentData);
    console.log(import.meta.env.VITE_SERVER_URL);
    const resp = await fetch(`${import.meta.env.VITE_SERVER_URL}/pay`, options);

    const jsonData = await resp.json();

    if (resp.ok) return jsonData;
    throw new Error(`Error: ${resp.status} - ${resp.statusText}`);
  }
}
