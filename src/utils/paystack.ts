import { PAYMENT_AMOUNT_NAIRA } from "../var/var";

declare global {
  interface Window {
    PaystackPop: any;
  }
}

export function loadPaystackScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (window.PaystackPop) return resolve(true);

    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v1/inline.js";
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

type PAystackArgs = {
  onSuccess: () => void;
  onCancel: () => void;
};

export function launchPaystackCheckout({ onSuccess, onCancel }: PAystackArgs) {
  if (!window.PaystackPop) return false;

  const handler = window.PaystackPop.setup({
    key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
    email: "chrisajulu379@gmail.com",
    amount: PAYMENT_AMOUNT_NAIRA * 100,
    currency: "NGN",
    metadata: {
      custom_fields: [
        {
          display_name: "Developer",
          variable_name: "developer",
          value: "Chris Ajulu",
        },
      ],
    },
    callback: onSuccess,
    onClose: onCancel,
  });

  handler.openIframe();
  return true;
}
