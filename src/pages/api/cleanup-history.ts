import type { NextApiRequest, NextApiResponse } from "next";
import { supabaseServer } from "@/lib/supabaseServer";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const sevenDaysAgo = new Date(
    Date.now() - 7 * 24 * 60 * 60 * 1000
  ).toISOString();

  await supabaseServer
    .from("calculation_history")
    .delete()
    .lt("created_at", sevenDaysAgo);

  res.status(200).json({ ok: true });
}
