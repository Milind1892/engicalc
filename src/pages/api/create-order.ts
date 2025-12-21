import type { NextApiRequest, NextApiResponse } from "next";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

const prices: Record<string, number> = {
  weekly: 99900,
  monthly: 399900,
  yearly: 4999900,
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { plan, currency } = req.body;

  try {
    const order = await razorpay.orders.create({
      amount: prices[plan],
      currency,
      receipt: `receipt_${Date.now()}`,
    });

    res.status(200).json({ order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Order creation failed" });
  }
}
