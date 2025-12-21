import { useEffect } from "react";
import { useRouter } from "next/router";
import Navbar from "../components/Navbar";

export default function PaymentSuccess() {
  const router = useRouter();

  useEffect(() => {
    // Optional: you can fetch subscription info here later

    // Auto redirect after few seconds
    const timer = setTimeout(() => {
      router.push("/dashboard");
    }, 4000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <>
      <Navbar />

      <main className="page" style={{ textAlign: "center" }}>
        <div className="card" style={{ maxWidth: 520, margin: "auto" }}>
          <h1 style={{ fontSize: 32 }}>✅ Payment Successful</h1>

          <p style={{ marginTop: 12, color: "var(--muted)" }}>
            Thank you for subscribing to <b>EngiCalc Premium</b>.
          </p>

          <p style={{ marginTop: 18 }}>
            Your premium access has been enabled.
          </p>

          <p style={{ marginTop: 20, fontSize: 14, color: "var(--muted)" }}>
            Redirecting you to your dashboard…
          </p>

          <button
            onClick={() => router.push("/dashboard")}
            className="btn btn-primary"
            style={{ marginTop: 24 }}
          >
            Go to Dashboard Now
          </button>
        </div>
      </main>
    </>
  );
}
