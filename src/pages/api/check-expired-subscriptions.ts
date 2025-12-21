import type { NextApiRequest, NextApiResponse } from "next";
import { supabaseServer } from "../../utils/supabaseServer";
import { sendMail } from "../../utils/mailer";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const now = new Date().toISOString();

    const { data: expiredSubs } = await supabaseServer
      .from("subscriptions")
      .select("*")
      .eq("status", "active")
      .lt("current_period_end", now);

    if (!expiredSubs || expiredSubs.length === 0) {
      return res.status(200).json({ message: "No expired subscriptions" });
    }

    for (const sub of expiredSubs) {
      /* UPDATE STATUS */
      await supabaseServer
        .from("subscriptions")
        .update({ status: "expired" })
        .eq("id", sub.id);

      /* 📩 USER EMAIL */
      await sendMail({
        to: sub.email,
        subject: "Your EngiCalc Subscription Has Expired",
        html: `
          <p>Hello,</p>
          <p>Your <strong>${sub.plan}</strong> subscription has expired.</p>
          <p>Renew to continue using all calculators.</p>
          <br/>
          <p>— EngiCalc Team</p>
        `,
      });

      /* 📩 ADMIN EMAIL */
      await sendMail({
        to: process.env.ADMIN_EMAIL!,
        subject: "Subscription Expired",
        html: `
          <h3>Subscription Expired</h3>
          <p><strong>User:</strong> ${sub.email}</p>
          <p><strong>Plan:</strong> ${sub.plan}</p>
        `,
      });
    }

    res.status(200).json({ success: true });
  } catch (err: any) {
    console.error("EXPIRY CHECK ERROR:", err);
    res.status(500).json({ error: err.message });
  }
}
