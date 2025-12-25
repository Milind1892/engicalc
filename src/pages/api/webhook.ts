// Note: needs raw body to verify signature
import type { NextApiRequest, NextApiResponse } from "next";
import crypto from "crypto";
import getRawBody from "raw-body";
import { supabaseServer } from "@/lib/supabaseServer";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end("Method not allowed");

  try {
    const raw = (await getRawBody(req)).toString();
    const signature = req.headers["x-razorpay-signature"] as string;
    const expected = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!).update(raw).digest("hex");
    if (signature !== expected) {
      console.warn("Webhook signature mismatch");
      return res.status(400).json({ error: "Invalid signature" });
    }

    const event = JSON.parse(raw);

    // handle events
    if (event.event === "payment.captured") {
      const p = event.payload.payment.entity;
      await supabaseServer.from("payments").insert([{
        razorpay_payment_id: p.id,
        razorpay_order_id: p.order_id,
        amount: p.amount,
        currency: p.currency,
        status: p.status,
        created_at: new Date(p.created_at * 1000)
      }]);
    }

    // subscription events
    if (event.event && event.event.startsWith("subscription.")) {
      const sub = event.payload.subscription?.entity;
      if (sub) {
        await supabaseServer.from("subscriptions").upsert([{
          razorpay_subscription_id: sub.id,
          plan: sub.plan_id || "unknown",
          status: sub.status,
          amount: sub.amount,
          currency: sub.currency,
          current_period_start: sub.current_start ? new Date(sub.current_start * 1000) : null,
          current_period_end: sub.current_end ? new Date(sub.current_end * 1000) : null,
        }], { onConflict: "razorpay_subscription_id" });
      }
    }

    return res.status(200).json({ ok: true });
  } catch (err: any) {
    console.error("webhook err:", err);
    return res.status(500).json({ error: err.message || "Server error" });
  }
}
