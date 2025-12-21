import type { NextApiRequest, NextApiResponse } from "next";
import { supabaseServer } from "../../../utils/supabaseServer";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const adminKey = req.headers["x-admin-key"];

  if (adminKey !== process.env.ADMIN_KEY) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { data, error } = await supabaseServer
    .from("subscriptions")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return res.status(500).json({ error: error.message });

  res.status(200).json(data);
}
