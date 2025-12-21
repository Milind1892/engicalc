import Navbar from "../components/Navbar";

export default function RefundPolicy() {
  return (
    <>
      <Navbar />
      <main style={page}>
        <h1 style={title}>Refund Policy</h1>

        <p style={text}>
          We aim to provide complete transparency regarding refunds and
          cancellations.
        </p>

        <h2 style={heading}>Subscription Refunds</h2>
        <p style={text}>
          Once a premium subscription is activated, refunds are generally not
          provided unless there is a technical issue from our side.
        </p>

        <h2 style={heading}>Duplicate or Failed Payments</h2>
        <p style={text}>
          In case of duplicate charges or failed transactions, the amount will
          be refunded within 5-7 business days.
        </p>

        <h2 style={heading}>Cancellation</h2>
        <p style={text}>
          Users can cancel subscriptions anytime. Access remains until the end
          of the billing cycle.
        </p>

        <h2 style={heading}>Contact</h2>
        <p style={text}>
          For refund-related queries, email us at
          <strong> support@engicalc.com</strong>.
        </p>
      </main>
    </>
  );
}

/* ================= STYLES ================= */

const page = {
  maxWidth: 900,
  margin: "auto",
  padding: "60px 20px",
};

const title = {
  fontSize: 36,
  fontWeight: 800,
  marginBottom: 30,
};

const heading = {
  fontSize: 22,
  fontWeight: 700,
  marginTop: 30,
  marginBottom: 10,
};

const text = {
  fontSize: 16,
  lineHeight: 1.7,
  color: "#374151",
};
