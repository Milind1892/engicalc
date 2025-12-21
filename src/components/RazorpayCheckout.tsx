import React from "react";

type Props = {
  plan: "weekly" | "monthly" | "yearly";
  currency?: "INR";
};

export default function RazorpayCheckout({
  plan,
  currency = "INR",
}: Props) {
  const handlePayment = async () => {
    try {
      const res = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan, currency }),
      });

      const data = await res.json();

      if (!data.order) {
        alert("Could not create order");
        return;
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: data.order.amount,
        currency: data.order.currency,
        name: "EngiCalc",
        description: `${plan.toUpperCase()} Plan`,
        order_id: data.order.id,

        handler: async function (response: any) {
          await fetch("/api/confirm-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              plan,
            }),
          });

          window.location.href = "/payment-success";
        },

        theme: {
          color: "#2563eb",
        },
      };

      if (!(window as any).Razorpay) {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = () => {
          const rzp = new (window as any).Razorpay(options);
          rzp.open();
        };
        document.body.appendChild(script);
      } else {
        const rzp = new (window as any).Razorpay(options);
        rzp.open();
      }
    } catch (err) {
      console.error(err);
      alert("Payment failed");
    }
  };

  return (
    <button className="btn btn-primary" onClick={handlePayment}>
      Buy {plan}
    </button>
  );
}
