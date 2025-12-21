import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext";

export function useSubscriptionGuard() {
  const { isPremium } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isPremium) {
      router.replace("/pricing");
    }
  }, [isPremium, router]);
}
