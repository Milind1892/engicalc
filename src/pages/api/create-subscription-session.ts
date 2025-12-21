import type { NextApiRequest, NextApiResponse } from "next";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

const PLAN_IDS: Record<string, string> = {
  monthly: process.env.RAZORPAY_MONTHLY_PLAN_ID!,
  yearly: process.env.RAZORPAY_YEARLY_PLAN_ID!,
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { plan } = req.body;

    const subscription = await razorpay.subscriptions.create({
      plan_id: PLAN_IDS[plan],
      customer_notify: 1,
      total_count: plan === "monthly" ? 12 : 1,
    });

    res.status(200).json({
      subscriptionId: subscription.id,
      userId: "demo-user-id", // replace with auth user later
    });
  } catch (err: any) {
    console.error("CREATE SUBSCRIPTION ERROR:", err);
    res.status(500).json({ error: err.message });
  }
}
