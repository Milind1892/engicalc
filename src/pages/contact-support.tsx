import Navbar from "../components/Navbar";

export default function ContactSupport() {
  return (
    <>
      <Navbar />
      <main style={page}>
        <h1 style={title}>Contact Support</h1>

        <p style={text}>
          Need help? We’re here to assist you with subscriptions, technical
          issues, or general questions.
        </p>

        <div style={card}>
          <p><strong>Email:</strong> support@engicalc.com</p>
          <p><strong>Response Time:</strong> Within 24–48 hours</p>
          <p><strong>Working Hours:</strong> Monday – Friday (10 AM – 6 PM IST)</p>
        </div>
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

const text = {
  fontSize: 16,
  lineHeight: 1.7,
  color: "#374151",
  marginBottom: 20,
};

const card = {
  background: "#ffffff",
  padding: 24,
  borderRadius: 12,
  boxShadow: "0 10px 25px rgba(0,0,0,0.06)",
};
