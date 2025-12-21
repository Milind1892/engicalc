import Link from "next/link";

export default function CalculatorCard({
  name,
  locked,
}: {
  name: string;
  locked: boolean;
}) {
  const slug = name.toLowerCase();

  return (
    <div className="card" style={styles.card}>
      {/* Title */}
      <h3 style={styles.title}>{name} Calculator</h3>

      {/* Description */}
      <p style={styles.desc}>
        Accurate engineering calculations made simple.
      </p>

      {/* Action */}
      {locked ? (
        <Link href="pricing"style={{ textDecoration: "none" }}>
          <div style={{ ...styles.button, ...styles.lockedBtn }}>
            🔒 Locked — Upgrade
          </div>
        </Link>
      ) : (
        <Link href={`/calculators/${slug}`} style={{ textDecoration: "none" }}>
          <div style={{ ...styles.button, ...styles.openBtn }}>
            Open Calculator →
          </div>
        </Link>
      )}
    </div>
  );
}

/* ---------- Styles ---------- */
const styles = {
  card: {
    display: "flex",
    flexDirection: "column" as const,
    justifyContent: "space-between",
    minHeight: 180,
  },

  title: {
    fontSize: 18,
    fontWeight: 700,
    marginBottom: 6,
  },

  desc: {
    fontSize: 14,
    color: "var(--muted)",
    marginBottom: 16,
  },

  button: {
    marginTop: "auto",
    padding: "10px 14px",
    borderRadius: 10,
    textAlign: "center" as const,
    fontWeight: 600,
    fontSize: 14,
    cursor: "pointer",
    transition: "all 0.25s ease",
  },

  openBtn: {
    background: "linear-gradient(135deg, var(--primary), var(--primary-dark))",
    color: "#fff",
  },

  lockedBtn: {
    background: "rgba(239, 68, 68, 0.1)",
    color: "#dc2626",
    border: "1px solid rgba(239, 68, 68, 0.4)",
  },
};
