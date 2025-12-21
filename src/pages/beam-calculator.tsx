import Head from "next/head";
import Link from "next/link";
import Navbar from "../components/Navbar";

/* ================= PAGE ================= */

export default function BeamCalculatorSEO() {
  return (
    <>
      {/* ================= SEO META ================= */}
      <Head>
        <title>
          Beam Calculator | Shear Force & Bending Moment Calculator Online
        </title>

        <meta
          name="description"
          content="Beam Calculator for engineering students and professionals. Calculate shear force, bending moment and deflection of beams online. Supports simply supported, cantilever and fixed beams. Ideal for GATE, ESE and university exams."
        />

        <meta
          name="keywords"
          content="
            beam calculator,
            shear force diagram calculator,
            bending moment diagram calculator,
            beam deflection calculator,
            simply supported beam calculator,
            cantilever beam calculator,
            fixed beam calculator,
            civil engineering beam calculator,
            mechanical engineering beam calculator,
            strength of materials beam problems,
            gate beam questions
          "
        />

        <meta name="robots" content="index, follow" />
        <meta name="author" content="EngiCalc" />

        {/* ✅ Canonical URL */}
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_APP_URL}/beam-calculator`}
        />
      </Head>

      <Navbar />

      {/* ================= CONTENT ================= */}
      <main style={page}>
        {/* HERO */}
        <section style={hero}>
          <h1 style={heroTitle}>
            Beam Calculator – Shear Force & Bending Moment
          </h1>
          <p style={heroSubtitle}>
            Professional beam analysis tool for civil & mechanical engineers
          </p>

          <Link href="/pricing" style={heroBtn}>
            Use Advanced Beam Calculator
          </Link>
        </section>

        {/* INTRO */}
        <section style={card}>
          <p>
            The <strong>Beam Calculator</strong> by EngiCalc helps engineers
            calculate <b>Shear Force Diagram (SFD)</b>,{" "}
            <b>Bending Moment Diagram (BMD)</b> and beam deflection accurately.
            This tool is widely used in <b>Strength of Materials</b>,{" "}
            <b>Structural Analysis</b>, GATE and university-level problems.
          </p>
        </section>

        {/* WHO */}
        <section style={card}>
          <h2 style={h2}>Who Should Use This Beam Calculator?</h2>
          <ul style={list}>
            <li>Civil Engineering Students</li>
            <li>Mechanical Engineering Students</li>
            <li>GATE / ESE Aspirants</li>
            <li>Structural Designers</li>
            <li>Site & Design Engineers</li>
          </ul>
        </section>

        {/* BEAM TYPES */}
        <section style={card}>
          <h2 style={h2}>Supported Beam Types</h2>
          <ul style={list}>
            <li>Simply Supported Beam</li>
            <li>Cantilever Beam</li>
            <li>Fixed Beam</li>
            <li>Point Load, UDL & UVL</li>
            <li>Multiple Point Loads</li>
          </ul>
        </section>

        {/* FORMULAS */}
        <section style={card}>
          <h2 style={h2}>Important Beam Formulas</h2>

          <div style={formulaBox}>
            <p><strong>Bending Stress:</strong></p>
            <code style={code}>σ = M × y / I</code>
          </div>

          <div style={formulaBox}>
            <p><strong>Beam Deflection (UDL):</strong></p>
            <code style={code}>δ = (w × L³) / (48 × E × I)</code>
          </div>
        </section>

        {/* INTERNAL LINKS */}
        <section style={card}>
          <h2 style={h2}>Related Engineering Calculators</h2>

          <ul style={list}>
            <li>
              <Link href="/stress-calculator">
                Stress Calculator
              </Link>
            </li>
            <li>
              <Link href="/torsion-calculator">
                Torsion Calculator
              </Link>
            </li>
            <li>
              <Link href="/section-properties-calculator">
                Section Properties Calculator
              </Link>
            </li>
          </ul>
        </section>

        {/* CTA */}
        <section style={{ ...card, textAlign: "center" }}>
          <h2 style={h2}>Ready for Advanced Beam Analysis?</h2>
          <p style={{ marginBottom: 16 }}>
            Get access to automatic diagrams, PDF reports and calculation
            history.
          </p>

          <Link href="/pricing" style={ctaBtn}>
            Unlock Premium Access
          </Link>
        </section>
      </main>
    </>
  );
}

/* ================= STYLES ================= */

const page = {
  maxWidth: 1100,
  margin: "auto",
  padding: "40px 20px",
};

const hero = {
  textAlign: "center" as const,
  padding: "60px 20px 40px",
};

const heroTitle = {
  fontSize: 40,
  fontWeight: 800,
};

const heroSubtitle = {
  marginTop: 12,
  fontSize: 18,
  color: "#6b7280",
};

const heroBtn = {
  display: "inline-block",
  marginTop: 24,
  background: "#2563eb",
  color: "#fff",
  padding: "12px 24px",
  borderRadius: 10,
  textDecoration: "none",
  fontWeight: 600,
};

const card = {
  background: "#fff",
  padding: 28,
  borderRadius: 16,
  marginTop: 28,
  boxShadow: "0 12px 30px rgba(0,0,0,0.06)",
};

const h2 = {
  fontSize: 22,
  fontWeight: 700,
  marginBottom: 12,
};

const list = {
  paddingLeft: 20,
  lineHeight: 1.8,
};

const formulaBox = {
  background: "#f9fafb",
  padding: 16,
  borderRadius: 10,
  marginTop: 12,
};

const code = {
  display: "block",
  marginTop: 6,
  fontSize: 16,
  color: "#111827",
};

const ctaBtn = {
  display: "inline-block",
  background: "#16a34a",
  color: "#fff",
  padding: "12px 26px",
  borderRadius: 10,
  textDecoration: "none",
  fontWeight: 700,
};
