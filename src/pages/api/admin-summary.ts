// /pages/api/admin-summary.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.headers["x-admin-key"] !== process.env.ADMIN_API_KEY) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const payments = await supabase.from("payments").select("*").order("created_at", { ascending: false });
  const subscriptions = await supabase.from("subscriptions").select("*").order("created_at", { ascending: false });

  return res.status(200).json({
    payments: payments.data ?? [],
    subscriptions: subscriptions.data ?? [],
  });
}
