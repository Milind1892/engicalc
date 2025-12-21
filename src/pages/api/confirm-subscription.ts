import type { NextApiRequest, NextApiResponse } from "next";
import crypto from "crypto";
import { supabaseServer } from "../../utils/supabaseServer";
import { sendMail } from "../../utils/mailer";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const {
      razorpay_payment_id,
      razorpay_subscription_id,
      razorpay_signature,
      userId,
      plan,
      userDetails, // frontend sends this
    } = req.body;

    if (
      !razorpay_payment_id ||
      !razorpay_subscription_id ||
      !razorpay_signature ||
      !userId ||
      !plan
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    /* --------------------------------------------------
       🔐 VERIFY RAZORPAY SIGNATURE
    -------------------------------------------------- */
    const body = razorpay_payment_id + "|" + razorpay_subscription_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ error: "Signature mismatch" });
    }

    /* --------------------------------------------------
       📅 CALCULATE SUBSCRIPTION DATES
    -------------------------------------------------- */
    const now = new Date();
    const end = new Date(now);

    if (plan === "monthly") {
      end.setMonth(end.getMonth() + 1);
    } else if (plan === "yearly") {
      end.setFullYear(end.getFullYear() + 1);
    }

    /* --------------------------------------------------
       💾 SAVE TO SUPABASE
    -------------------------------------------------- */
    await supabaseServer.from("subscriptions").insert([
      {
        user_id: userId,
        plan,
        razorpay_subscription_id,
        status: "active",
        current_period_start: now,
        current_period_end: end,
      },
    ]);

    /* --------------------------------------------------
       📧 USER EMAIL – SUCCESS
    -------------------------------------------------- */
    if (userDetails?.email) {
      await sendMail({
        to: userDetails.email,
        subject: "Subscription Activated Successfully 🎉",
        html: `
          <h2>Welcome to EngiCalc!</h2>
          <p>Your <b>${plan.toUpperCase()}</b> subscription is now active.</p>

          <p><b>Start Date:</b> ${now.toDateString()}</p>
          <p><b>Expiry Date:</b> ${end.toDateString()}</p>

          <p>You now have full access to all calculators.</p>
          <br/>
          <p>— Team EngiCalc</p>
        `,
      });
    }

    /* --------------------------------------------------
       📧 ADMIN EMAIL – NEW SUBSCRIPTION
    -------------------------------------------------- */
    await sendMail({
      to: process.env.ADMIN_EMAIL!,
      subject: "New Subscription Purchased 🚀",
      html: `
        <h3>New Subscription Details</h3>
        <ul>
          <li><b>Name:</b> ${userDetails?.name || "N/A"}</li>
          <li><b>Email:</b> ${userDetails?.email || "N/A"}</li>
          <li><b>Phone:</b> ${userDetails?.phone || "N/A"}</li>
          <li><b>Country:</b> ${userDetails?.country || "N/A"}</li>
          <li><b>State:</b> ${userDetails?.state || "N/A"}</li>
          <li><b>City:</b> ${userDetails?.city || "N/A"}</li>
          <li><b>Plan:</b> ${plan}</li>
          <li><b>Razorpay Subscription ID:</b> ${razorpay_subscription_id}</li>
          <li><b>Valid Till:</b> ${end.toDateString()}</li>
        </ul>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (err: any) {
    console.error("CONFIRM SUBSCRIPTION ERROR:", err);
    return res.status(500).json({ error: err.message });
  }
}
