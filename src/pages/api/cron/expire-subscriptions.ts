import { supabaseServer } from "@/lib/supabaseServer";

export default async function handler() {
  const now = new Date().toISOString();

  await supabaseServer
    .from("subscriptions")
    .update({ status: "expired" })
    .lt("current_period_end", now)
    .eq("status", "active");

  return new Response("OK");
}
