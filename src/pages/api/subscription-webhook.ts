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
  try {
    const raw = (await getRawBody(req)).toString();
    const signature = req.headers["x-razorpay-signature"] as string;

    const expected = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(raw)
      .digest("hex");

    if (expected !== signature)
      return res.status(400).json({ error: "Invalid signature" });

    const event = JSON.parse(raw);

    if (event.event === "subscription.charged") {
      const s = event.payload.subscription.entity;

      await supabaseServer
        .from("subscriptions")
        .update({
          status: s.status,
          current_period_start: new Date(s.current_start * 1000),
          current_period_end: new Date(s.current_end * 1000),
        })
        .eq("razorpay_subscription_id", s.id);
    }

    if (event.event === "subscription.cancelled") {
      const s = event.payload.subscription.entity;

      await supabaseServer
        .from("subscriptions")
        .update({ status: "cancelled" })
        .eq("razorpay_subscription_id", s.id);
    }

    res.status(200).json({ ok: true });
  } catch (err: any) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
}
