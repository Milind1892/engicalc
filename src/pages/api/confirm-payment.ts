import type { NextApiRequest, NextApiResponse } from "next";
import crypto from "crypto";
import { supabaseServer } from "@/lib/supabaseServer";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const {
    razorpay_payment_id,
    razorpay_order_id,
    razorpay_signature,
    plan,
    email,
  } = req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
    .update(body)
    .digest("hex");

  if (expectedSignature !== razorpay_signature) {
    return res.status(400).json({ error: "Invalid signature" });
  }

  await supabaseServer.from("subscriptions").insert({
    user_email: email,
    plan,
    status: "active",
    razorpay_payment_id,
    razorpay_order_id,
  });

  return res.status(200).json({ success: true });
}
