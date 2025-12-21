// /pages/api/create-subscription.ts
import type { NextApiRequest, NextApiResponse } from "next";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Only POST allowed" });

  try {
    const { plan_id } = req.body;

    const subscription = await razorpay.subscriptions.create({
      plan_id,
      customer_notify: 1,
      total_count: 12, // yearly billing cycle
    });

    return res.status(200).json(subscription);
  } catch (err) {
    console.error("SUBSCRIPTION ERROR:", err);
    return res.status(500).json({ error: "Failed to create subscription" });
  }
}
