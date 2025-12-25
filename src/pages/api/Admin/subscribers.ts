import type { NextApiRequest, NextApiResponse } from "next";
import { supabaseServer } from "@/lib/supabaseServer";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const adminKey = req.headers["x-admin-key"] || req.query.adminKey;
  if (adminKey !== process.env.ADMIN_KEY) return res.status(401).json({ error: "unauthorized" });

  const { data, error } = await supabaseServer
    .from("subscriptions")
    .select(`*, payments:payments(*)`)
    .order("created_at", { ascending: false });

  if (error) return res.status(500).json({ error: error.message });
  res.status(200).json({ subscribers: data });
}
