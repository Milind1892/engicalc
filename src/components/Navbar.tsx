import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

export default function Navbar() {
  const { isPremium } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <header style={styles.header}>
      <div className="container" style={styles.container}>
        {/* Logo */}
        <Link href="/" style={styles.logo}>
          EngiCalc
        </Link>

        {/* Nav links */}
        <nav style={styles.nav}>
  <NavLink href="/pricing" label="Pricing" />

  {/* ✅ PUBLIC SEO PAGE ONLY */}
  <NavLink href="/beam-calculator" label="Beam" />

  <NavLink href="/admin" label="Admin" />

  {isPremium && <span style={styles.proBadge}>PRO</span>}

  {/* Theme toggle */}
  <button onClick={toggleTheme} style={styles.themeBtn}>
    {theme === "light" ? "🌙" : "☀️"}
  </button>
</nav>
      </div>
    </header>
  );
}

/* ---------- Reusable Nav Link ---------- */
function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} style={styles.link}>
      {label}
    </Link>
  );
}

/* ---------- Styles ---------- */
const styles = {
  header: {
    position: "sticky" as const,
    top: 0,
    zIndex: 100,
    background: "var(--card)",
    borderBottom: "1px solid var(--border)",
    backdropFilter: "blur(10px)",
  },

  container: {
    maxWidth: 1200,
    margin: "auto",
    padding: "14px 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  logo: {
    fontSize: 22,
    fontWeight: 800,
    color: "var(--primary)",
    textDecoration: "none",
    letterSpacing: "0.4px",
  },

  nav: {
    display: "flex",
    alignItems: "center",
    gap: 18,
  },

  link: {
    textDecoration: "none",
    color: "var(--text)",
    fontWeight: 500,
    fontSize: 14,
    padding: "6px 10px",
    borderRadius: 8,
    transition: "background 0.2s ease",
  },

  proBadge: {
    background: "linear-gradient(135deg, #22c55e, #16a34a)",
    color: "#fff",
    padding: "4px 10px",
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: "0.5px",
  },

  themeBtn: {
    marginLeft: 6,
    width: 34,
    height: 34,
    borderRadius: "50%",
    border: "1px solid var(--border)",
    background: "transparent",
    cursor: "pointer",
    fontSize: 14,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};
