import Navbar from "../components/Navbar";
import { GetServerSideProps } from "next";
import { supabase } from "../lib/supabaseClient";
import { useState } from "react";

/* ================= TYPES ================= */

type Subscription = {
  id: string;
  plan: string;
  status: string;
  created_at: string;
  current_period_end: string;
  razorpay_subscription_id: string;
};

type HistoryItem = {
  id: string;
  calculator: string;
  results: any;
};

/* ================= PAGE ================= */

export default function Dashboard({
  subscription,
}: {
  subscription: Subscription | null;
}) {
  const [subHistory] = useState<HistoryItem[]>([]); // 🔹 ready for Supabase

  const cancelSubscription = async () => {
    const confirmCancel = window.confirm(
      "Cancel your subscription? Allowed only within 24 hours of purchase."
    );
    if (!confirmCancel || !subscription) return;

    const res = await fetch("/api/cancel-subscription", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        subscription_id: subscription.razorpay_subscription_id,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error || "Failed to cancel subscription");
    } else {
      alert("Subscription cancelled successfully");
      window.location.reload();
    }
  };

  return (
    <>
      <Navbar />

      <main className="page">
        <h1 className="section-title">Dashboard</h1>
        <p style={subtitle}>Manage your subscription & calculations</p>

        {/* ================= SUBSCRIPTION ================= */}
        {!subscription ? (
          <div className="card" style={emptyCard}>
            <p>You don’t have an active subscription.</p>
          </div>
        ) : (
          <div className="card">
            <h2 style={sectionTitle}>Your Subscription</h2>

            <table style={table}>
              <thead>
                <tr>
                  <th style={th}>Plan</th>
                  <th style={th}>Status</th>
                  <th style={th}>Start Date</th>
                  <th style={th}>Expiry</th>
                  <th style={th}>Action</th>
                </tr>
              </thead>

              <tbody>
                {(() => {
                  const created = new Date(subscription.created_at);
                  const expiry = new Date(subscription.current_period_end);
                  const now = new Date();

                  const isExpired = expiry < now;
                  const within24h =
                    now.getTime() - created.getTime() <=
                    24 * 60 * 60 * 1000;

                  return (
                    <tr>
                      <td style={td}>{subscription.plan}</td>

                      <td
                        style={{
                          ...td,
                          color:
                            subscription.status === "active"
                              ? "green"
                              : "red",
                        }}
                      >
                        {isExpired ? "expired" : subscription.status}
                      </td>

                      <td style={td}>{created.toDateString()}</td>
                      <td style={td}>{expiry.toDateString()}</td>

                      <td style={td}>
                        {subscription.status === "active" && within24h && (
                          <button
                            onClick={cancelSubscription}
                            style={cancelBtn}
                          >
                            Cancel
                          </button>
                        )}

                        {subscription.status === "active" && !within24h && (
                          <span style={{ color: "#999" }}>Locked</span>
                        )}

                        {subscription.status !== "active" && (
                          <span style={{ color: "#999" }}>—</span>
                        )}
                      </td>
                    </tr>
                  );
                })()}
              </tbody>
            </table>
          </div>
        )}

        {/* ================= RECENT CALCULATIONS ================= */}
        <h2 style={{ marginTop: 40 }}>Recent Calculations (7 days)</h2>

        {subHistory.length === 0 && (
          <p style={{ color: "var(--muted)" }}>
            No calculations found in last 7 days.
          </p>
        )}

        {subHistory.map((h) => (
          <div key={h.id} className="card" style={{ marginTop: 12 }}>
            <strong>{h.calculator.toUpperCase()}</strong>

            <pre
              style={{
                fontSize: 12,
                background: "#f8f8f8",
                padding: 12,
                borderRadius: 8,
                marginTop: 8,
                overflowX: "auto",
              }}
            >
              {JSON.stringify(h.results, null, 2)}
            </pre>
          </div>
        ))}
      </main>
    </>
  );
}

/* ================= SERVER SIDE ================= */

export const getServerSideProps: GetServerSideProps = async () => {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user) {
    return {
      redirect: { destination: "/login", permanent: false },
    };
  }

  const { data } = await supabase
    .from("subscriptions")
    .select("*")
    .eq("user_id", session.user.id)
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  return {
    props: {
      subscription: data || null,
    },
  };
};

/* ================= STYLES ================= */

const subtitle = {
  textAlign: "center" as const,
  color: "var(--muted)",
  marginBottom: 40,
};

const sectionTitle = {
  fontSize: 18,
  fontWeight: 700,
  marginBottom: 16,
};

const emptyCard = {
  padding: 24,
  textAlign: "center" as const,
  color: "var(--muted)",
};

const table = {
  width: "100%",
  borderCollapse: "collapse" as const,
};

const th = {
  borderBottom: "1px solid var(--border)",
  textAlign: "left" as const,
  padding: 10,
};

const td = {
  borderBottom: "1px solid var(--border)",
  padding: 10,
};

const cancelBtn = {
  padding: "6px 12px",
  background: "#ef4444",
  color: "#fff",
  border: "none",
  borderRadius: 6,
  cursor: "pointer",
};
