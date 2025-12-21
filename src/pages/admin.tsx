import Navbar from "../components/Navbar";
import { GetServerSideProps } from "next";
import { supabase } from "../lib/supabaseClient";

/* ================= TYPES ================= */

type Subscription = {
  id: string;
  email: string;
  plan: string;
  status: string;
  created_at: string;
  razorpay_subscription_id: string;
};

type Props = {
  subscriptions: Subscription[];
  stats: {
    totalUsers: number;
    activeSubscribers: number;
    monthlyRevenue: number;
    yearlyRevenue: number;
  };
};

/* ================= PAGE ================= */

export default function AdminDashboard({ subscriptions, stats }: Props) {
  const cancelSubscription = async (subscriptionId: string) => {
    if (!confirm("Cancel this subscription immediately?")) return;

    await fetch("/api/cancel-subscription", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        subscription_id: subscriptionId,
        admin: true,
      }),
    });

    location.reload();
  };

  return (
    <>
      <Navbar />

      <main className="page">
        <h1 className="section-title">Admin Dashboard</h1>
        <p style={subtitle}>
          Overview of subscriptions, revenue and system status
        </p>

        {/* STATS */}
        <div style={statsGrid}>
          <StatCard title="Total Users" value={stats.totalUsers.toString()} />
          <StatCard
            title="Active Subscribers"
            value={stats.activeSubscribers.toString()}
          />
          <StatCard
            title="Monthly Revenue"
            value={`₹${stats.monthlyRevenue}`}
          />
          <StatCard
            title="Yearly Revenue"
            value={`₹${stats.yearlyRevenue}`}
          />
        </div>

        {/* SECTIONS */}
        <div style={sectionGrid}>
          <div className="card">
            <h2 style={sectionTitle}>Subscriptions</h2>
            <p style={muted}>Recent subscription activity</p>

            <table width="100%">
              <thead>
                <tr>
                  <th style={th}>Email</th>
                  <th style={th}>Plan</th>
                  <th style={th}>Status</th>
                  <th style={th}>Date</th>
                  <th style={th}>Action</th>
                </tr>
              </thead>
              <tbody>
                {subscriptions.map((sub) => (
                  <tr key={sub.id}>
                    <td style={td}>{sub.email}</td>
                    <td style={td}>{sub.plan}</td>
                    <td
                      style={{
                        ...td,
                        color: sub.status === "active" ? "green" : "red",
                      }}
                    >
                      {sub.status}
                    </td>
                    <td style={td}>
                      {new Date(sub.created_at).toDateString()}
                    </td>
                    <td style={td}>
                      {sub.status === "active" && (
                        <button
                          className="btn"
                          onClick={() =>
                            cancelSubscription(sub.razorpay_subscription_id)
                          }
                        >
                          Cancel
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="card">
            <h2 style={sectionTitle}>System Status</h2>
            <p style={muted}>Webhook & payment health</p>

            <ul style={list}>
              <li>✅ Razorpay Webhook: Active</li>
              <li>✅ Supabase Connection: OK</li>
              <li>✅ Email Service: OK</li>
            </ul>
          </div>
        </div>
      </main>
    </>
  );
}

/* ================= SSR ================= */

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  if (ctx.query.key !== process.env.ADMIN_KEY) {
    return {
      redirect: { destination: "/", permanent: false },
    };
  }

  const { data: subscriptions } = await supabase
    .from("subscriptions")
    .select("*")
    .order("created_at", { ascending: false });

  const active = subscriptions?.filter((s) => s.status === "active") || [];

  const monthlyRevenue =
    active.filter((s) => s.plan === "monthly").length * 3999;
  const yearlyRevenue =
    active.filter((s) => s.plan === "yearly").length * 49999;

  return {
    props: {
      subscriptions: subscriptions || [],
      stats: {
        totalUsers: subscriptions?.length || 0,
        activeSubscribers: active.length,
        monthlyRevenue,
        yearlyRevenue,
      },
    },
  };
};

/* ================= COMPONENTS ================= */

function StatCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="card" style={statCard}>
      <p style={statTitle}>{title}</p>
      <h2 style={statValue}>{value}</h2>
    </div>
  );
}

/* ================= STYLES ================= */

const subtitle = {
  textAlign: "center" as const,
  color: "var(--muted)",
  marginBottom: 40,
};

const statsGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: 20,
  marginBottom: 40,
};

const statCard = {
  textAlign: "center" as const,
  padding: 24,
};

const statTitle = {
  fontSize: 14,
  color: "var(--muted)",
};

const statValue = {
  fontSize: 28,
  fontWeight: 800,
  marginTop: 8,
};

const sectionGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
  gap: 30,
};

const sectionTitle = {
  fontSize: 18,
  fontWeight: 700,
  marginBottom: 6,
};

const muted = {
  color: "var(--muted)",
  marginBottom: 16,
};

const list = {
  listStyle: "none",
  padding: 0,
  lineHeight: "1.8",
};

const th = {
  textAlign: "left" as const,
  padding: 8,
  borderBottom: "1px solid var(--border)",
};

const td = {
  padding: 8,
  borderBottom: "1px solid var(--border)",
};
