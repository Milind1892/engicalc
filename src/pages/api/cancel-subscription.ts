import type { NextApiRequest, NextApiResponse } from "next";
import Razorpay from "razorpay";
import { supabaseServer } from "../../utils/supabaseServer";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { subscription_id, user_id } = req.body;

    if (!subscription_id || !user_id) {
      return res.status(400).json({ error: "Missing parameters" });
    }

    /* --------------------------------------------------
       1️⃣ FETCH SUBSCRIPTION FROM DB
    -------------------------------------------------- */
    const { data: subscription, error } = await supabaseServer
      .from("subscriptions")
      .select("*")
      .eq("razorpay_subscription_id", subscription_id)
      .eq("user_id", user_id)
      .single();

    if (error || !subscription) {
      return res.status(404).json({ error: "Subscription not found" });
    }

    if (subscription.status !== "active") {
      return res
        .status(400)
        .json({ error: "Subscription is not active" });
    }

    /* --------------------------------------------------
       2️⃣ CHECK 24-HOUR CANCELLATION WINDOW
    -------------------------------------------------- */
    const createdAt = new Date(subscription.created_at).getTime();
    const now = Date.now();
    const HOURS_24 = 24 * 60 * 60 * 1000;

    if (now - createdAt > HOURS_24) {
      return res.status(403).json({
        error: "Cancellation allowed only within 24 hours of purchase",
      });
    }

    /* --------------------------------------------------
       3️⃣ CANCEL ON RAZORPAY
    -------------------------------------------------- */
    await razorpay.subscriptions.cancel(subscription_id);

    /* --------------------------------------------------
       4️⃣ UPDATE DATABASE
    -------------------------------------------------- */
    await supabaseServer
      .from("subscriptions")
      .update({
        status: "cancelled",
        cancelled_at: new Date(),
      })
      .eq("id", subscription.id);

    return res.status(200).json({ success: true });
  } catch (err: any) {
    console.error("CANCEL SUBSCRIPTION ERROR:", err);
    return res.status(500).json({ error: err.message });
  }
}
