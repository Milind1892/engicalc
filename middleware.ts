import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();

  // Protect only calculators
  if (!url.pathname.startsWith("/calculators")) {
    return NextResponse.next();
  }

  // Read email from cookie (set after payment)
  const email = req.cookies.get("user-email")?.value;

  if (!email) {
    url.pathname = "/pricing";
    return NextResponse.redirect(url);
  }

  // Check subscription status
  const { data } = await supabase
    .from("subscriptions")
    .select("status")
    .eq("email", email)
    .eq("status", "active")
    .single();

  if (!data) {
    url.pathname = "/pricing";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/calculators/:path*"],
};
