import Link from "next/link";
import Navbar from "../components/Navbar";

export default function PaymentCancel() {
  return (
    <>
      <Navbar />

      <main className="page" style={{ textAlign: "center" }}>
        <div className="card" style={{ maxWidth: 520, margin: "auto" }}>
          <h1 style={{ fontSize: 32, color: "#dc2626" }}>
            ❌ Payment Cancelled
          </h1>

          <p style={{ marginTop: 12, color: "var(--muted)" }}>
            No charge was made to your account.
          </p>

          <p style={{ marginTop: 12 }}>
            You can try again or contact support if the issue persists.
          </p>

          <div style={{ marginTop: 24, display: "flex", gap: 12, justifyContent: "center" }}>
            <Link href="/pricing" style={{ textDecoration: "none" }}>
              <span
                style={{
                  padding: "12px 18px",
                  background: "var(--primary)",
                  color: "#fff",
                  borderRadius: 10,
                  fontWeight: 600,
                  display: "inline-block",
                }}
              >
                Try Again
              </span>
            </Link>

            <Link href="/" style={{ textDecoration: "none" }}>
              <span
                style={{
                  padding: "12px 18px",
                  border: "1px solid var(--border)",
                  borderRadius: 10,
                  fontWeight: 600,
                  display: "inline-block",
                }}
              >
                Go Home
              </span>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
