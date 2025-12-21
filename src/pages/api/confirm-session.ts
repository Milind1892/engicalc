import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // IMPORTANT
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const email = req.headers["x-user-email"] as string;

  if (!email) {
    return res.status(401).json({ active: false });
  }

  const { data } = await supabase
    .from("subscriptions")
    .select("status")
    .eq("email", email)
    .single();

  if (!data || data.status !== "active") {
    return res.status(403).json({ active: false });
  }

  return res.json({ active: true });
}
