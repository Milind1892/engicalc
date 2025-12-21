import type { NextApiRequest, NextApiResponse } from "next";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const subscription = await razorpay.subscriptions.create({
      plan_id: "plan_RrxLBOobOcV6Dk", // TEMP (replace later)

      customer_notify: 1,
      notes: {
        email: "test@example.com",
      },
    } as any);

    return res.status(200).json(subscription);
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
}
