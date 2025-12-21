import React from "react";

declare global {
  interface Window {
    Razorpay: any;
  }
}

type Props = {
  plan: "monthly" | "yearly";
  user: {
    id: string;
    name: string;
    email: string;
    phone: string;
    country: string;
    state: string;
    city: string;
  };
};

export default function RazorpaySubscription({ plan, user }: Props) {
  const handleSubscribe = async () => {
    const res = await fetch("/api/create-subscription-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ plan }),
    });

    const { subscriptionId } = await res.json();
    if (!subscriptionId) return alert("Subscription creation failed");

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      subscription_id: subscriptionId,
      name: "EngiCalc",
      description: `${plan} subscription`,
      handler: async (response: any) => {
        await fetch("/api/confirm-subscription", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_subscription_id: response.razorpay_subscription_id,
            razorpay_signature: response.razorpay_signature,
            userId: user.id,
            plan,
            userDetails: user,
          }),
        });

        window.location.href = "/dashboard";
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <button className="btn btn-primary" onClick={handleSubscribe}>
      Subscribe {plan}
    </button>
  );
}
