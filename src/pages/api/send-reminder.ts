import type { NextApiRequest, NextApiResponse } from "next";
import { supabaseServer } from "@/lib/supabaseServer";
import sgMail from "@sendgrid/mail";
import dayjs from "dayjs";

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const adminKey = req.headers["x-admin-key"] || req.query.adminKey;
  if (adminKey !== process.env.ADMIN_KEY) return res.status(401).json({ error: "unauthorized" });

  // find subscriptions expiring in 3 days
  const now = dayjs();
  const target = now.add(3, "day").toISOString();

  const { data: subs, error } = await supabaseServer
    .from("subscriptions")
    .select("id, user_id, plan, current_period_end")
    .lte("current_period_end", target)
    .gte("current_period_end", now.subtract(1, "day").toISOString()); // a small window

  if (error) return res.status(500).json({ error: error.message });

  for (const s of subs || []) {
    // fetch user email (using auth.users table)
    const { data: user } = await supabaseServer
      .from("users") // if you have a separate users table; else use auth metadata
      .select("email")
      .eq("id", s.user_id)
      .single();

    const email = user?.email || `${s.user_id}@unknown.com`;

    const msg = {
      to: email,
      from: process.env.EMAIL_FROM,
      subject: `Your ${s.plan} plan is expiring soon`,
      text: `Hi — your ${s.plan} subscription expires on ${new Date(s.current_period_end).toLocaleString()}. Renew at ${process.env.NEXT_PUBLIC_APP_URL}/pricing`,
      html: `<p>Hi — your <strong>${s.plan}</strong> subscription expires on <strong>${new Date(s.current_period_end).toLocaleString()}</strong>.</p>
             <p><a href="${process.env.NEXT_PUBLIC_APP_URL}/pricing">Renew now</a></p>`
    };
    try {
      await sgMail.send(msg);
      // log
      await supabaseServer.from("reminders_log").insert([{ subscription_id: s.id, reminder_type: "expiry_3d" }]);
    } catch (err) {
      console.error("email error for", s.id, err);
    }
  }

  res.status(200).json({ sentCount: subs?.length ?? 0 });
}
