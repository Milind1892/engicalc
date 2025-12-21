import { supabase } from "../lib/supabaseClient";

export async function saveHistory({
  userId,
  calculator,
  inputs,
  results,
}: {
  userId: string;
  calculator: string;
  inputs?: any;
  results: any;
}) {
  await supabase.from("calculation_history").insert([
    {
      user_id: userId, // ✅ correct
      calculator,
      inputs,
      results,
    },
  ]);
}
