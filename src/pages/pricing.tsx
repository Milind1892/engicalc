import Navbar from "../components/Navbar";
import RazorpayCheckout from "../components/RazorpayCheckout";

export default function Pricing() {
  return (
    <>
      <Navbar />

      <main className="page">
        <h1 className="section-title">Choose Your Plan</h1>
        <p style={{ textAlign: "center", color: "var(--muted)" }}>
          Simple pricing. No hidden charges. Cancel anytime.
        </p>

        <div style={grid}>
          {/* WEEKLY */}
          <div className="card">
            <h2>Weekly Access</h2>
            <p style={price}>₹999</p>
            <p>One-time access to all calculators</p>
            <RazorpayCheckout plan="weekly" />
          </div>

          {/* MONTHLY */}
          <div className="card" style={highlight}>
            <span style={badge}>MOST POPULAR</span>
            <h2>Monthly</h2>
            <p style={price}>₹3999</p>
            <p>Unlimited access. Auto-renewable.</p>
            <RazorpayCheckout plan="monthly" />
          </div>

          {/* YEARLY */}
          <div className="card">
            <h2>Yearly</h2>
            <p style={price}>₹49999</p>
            <p>Best value for professionals</p>
            <RazorpayCheckout plan="yearly" />
          </div>
        </div>
      </main>
    </>
  );
}

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: 30,
  marginTop: 40,
};

const price = {
  fontSize: 36,
  fontWeight: 800,
};

const highlight = {
  border: "2px solid #2563eb",
};

const badge = {
  background: "#2563eb",
  color: "#fff",
  padding: "6px 12px",
  borderRadius: 999,
  fontSize: 12,
  fontWeight: 700,
};
