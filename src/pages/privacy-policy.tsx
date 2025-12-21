import Navbar from "../components/Navbar";

export default function PrivacyPolicy() {
  return (
    <>
      <Navbar />
      <main style={page}>
        <h1 style={title}>Privacy Policy</h1>

        <p style={text}>
          At EngiCalc, we respect your privacy and are committed to protecting
          your personal data. This Privacy Policy explains how we collect, use,
          and safeguard your information.
        </p>

        <h2 style={heading}>Information We Collect</h2>
        <p style={text}>
          We may collect personal information such as your email address, name,
          payment details, and usage data when you use our services or subscribe
          to premium features.
        </p>

        <h2 style={heading}>How We Use Your Information</h2>
        <ul style={list}>
          <li>To provide and maintain our services</li>
          <li>To process payments and subscriptions</li>
          <li>To improve user experience and features</li>
          <li>To communicate important updates</li>
        </ul>

        <h2 style={heading}>Data Security</h2>
        <p style={text}>
          We implement industry-standard security measures to protect your data.
          However, no method of transmission over the internet is 100% secure.
        </p>

        <h2 style={heading}>Third-Party Services</h2>
        <p style={text}>
          Payments are processed securely via Razorpay. We do not store your card
          or banking information on our servers.
        </p>

        <h2 style={heading}>Contact</h2>
        <p style={text}>
          If you have questions about this Privacy Policy, contact us at
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

const list = {
  paddingLeft: 20,
  lineHeight: 1.8,
};
