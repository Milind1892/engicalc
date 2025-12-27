import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CalculatorCard from "../components/CalculatorCard";
import UnitConverter from "../components/UnitConverter";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const { isPremium } = useAuth();

  return (
    <>
      {/* ✅ DEPLOYMENT CONFIRMATION BANNER (MERGED SAFELY) */}
      <div
        style={{
          textAlign: "center",
          padding: "10px",
          background: "#e8f5e9",
          color: "#1b5e20",
          fontSize: 14,
        }}
      >
        ✅ <strong>EngiCalc is Live</strong> on Vercel 🚀
        <Link
          href="/calculators/admin-summary"
          style={{ marginLeft: 8, textDecoration: "underline" }}
        >
          Admin Summary
        </Link>
      </div>

      <Navbar />

      {/* HERO */}
      <section style={hero}>
        <h1 style={heroTitle}>
          Engineering Calculators, <br /> Built for Professionals
        </h1>
        <p style={heroSubtitle}>
          Fast, accurate tools for beams, stress, torsion and more.
        </p>

        {!isPremium && (
          <Link href="/pricing" style={{ textDecoration: "none" }}>
            <div className="btn btn-primary" style={{ marginTop: 24 }}>
              Get Premium Access
            </div>
          </Link>
        )}
      </section>

      {/* MAIN CONTENT */}
      <main className="page">
        {/* UNIT CONVERTER */}
        <div className="card" style={{ marginBottom: 32 }}>
          <h2>Unit Converter</h2>
          <p style={muted}>Quickly convert engineering units</p>
          <div style={{ marginTop: 16 }}>
            <UnitConverter />
          </div>
        </div>

        {/* CALCULATORS */}
        <h2>Calculators</h2>
        <p style={muted}>
          Premium calculators for structural & mechanical analysis
        </p>

        <div style={grid}>
          <CalculatorCard name="Beam" locked={!isPremium} />
          <CalculatorCard name="Stress" locked={!isPremium} />
          <CalculatorCard name="Torsion" locked={!isPremium} />
          <CalculatorCard name="Section" locked={!isPremium} />
        </div>

        {!isPremium && (
          <p style={{ marginTop: 16, color: "var(--muted)" }}>
            Beam, Stress, Torsion & Section calculators are premium-only.{" "}
            <Link href="/pricing" className="link">
              View Pricing
            </Link>
          </p>
        )}
      </main>

      {/* TRUST */}
      <section style={trust}>
        Used by engineering students & professionals
      </section>

      <Footer />
    </>
  );
}

/* ---------- Styles ---------- */

const hero = {
  textAlign: "center" as const,
  padding: "100px 20px 80px",
};

const heroTitle = {
  fontSize: 44,
  fontWeight: 800,
};

const heroSubtitle = {
  marginTop: 16,
  fontSize: 18,
  color: "var(--muted)",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
  gap: 20,
  marginTop: 20,
};

const muted = {
  color: "var(--muted)",
  marginTop: 6,
};

const trust = {
  textAlign: "center" as const,
  padding: "40px 20px",
  color: "var(--muted)",
};
