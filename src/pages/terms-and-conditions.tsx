import Navbar from "../components/Navbar";

export default function TermsAndConditions() {
  return (
    <>
      <Navbar />
      <main style={page}>
        <h1 style={title}>Terms & Conditions</h1>

        <p style={text}>
          By accessing or using EngiCalc, you agree to comply with and be bound by
          these Terms & Conditions.
        </p>

        <h2 style={heading}>Use of Service</h2>
        <p style={text}>
          EngiCalc provides engineering calculators for educational and
          professional assistance. Results should be verified independently
          before real-world application.
        </p>

        <h2 style={heading}>User Responsibilities</h2>
        <ul style={list}>
          <li>You must provide accurate information</li>
          <li>You must not misuse the platform</li>
          <li>You are responsible for decisions made using results</li>
        </ul>

        <h2 style={heading}>Subscriptions & Payments</h2>
        <p style={text}>
          Premium subscriptions are billed through Razorpay. Prices and plans
          are subject to change with prior notice.
        </p>

        <h2 style={heading}>Limitation of Liability</h2>
        <p style={text}>
          EngiCalc is not liable for any direct or indirect damages arising from
          use of the platform.
        </p>

        <h2 style={heading}>Termination</h2>
        <p style={text}>
          We reserve the right to suspend or terminate access if these terms are
          violated.
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

const list = {
  paddingLeft: 20,
  lineHeight: 1.8,
};
