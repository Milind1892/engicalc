import type { NextApiRequest, NextApiResponse } from "next";
import { supabaseServer } from "../../lib/supabaseServer";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "method not allowed" });
  try {
    const { userId, amount, currency, plan, type, razorpay_payment_id, razorpay_subscription_id } = req.body;

    // store payment history
    await supabaseServer.from("payments").insert([{
      user_id: userId,
      amount: Math.round(amount),
      currency: currency || "INR",
      razorpay_payment_id,
      plan,
    }]);

    // upsert subscription record
    const now = new Date();
    let end = new Date(now);
    if (plan === "weekly") end.setDate(end.getDate() + 7);
    else if (plan === "monthly") end.setMonth(end.getMonth() + 1);
    else if (plan === "yearly") end.setFullYear(end.getFullYear() + 1);

    await supabaseServer.from("subscriptions").insert([{
      user_id: userId,
      plan,
      type,
      razorpay_subscription_id: razorpay_subscription_id || null,
      razorpay_payment_id: razorpay_payment_id || null,
      status: "active",
      current_period_start: now.toISOString(),
      current_period_end: end.toISOString()
    }]);

    res.status(200).json({ ok: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}
