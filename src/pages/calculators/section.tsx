import { useState } from "react";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import { useAuth } from "../../context/AuthContext";
import { generatePDF } from "../../utils/generatePDF";
import { saveHistory } from "../../utils/saveHistory";

/* ================= TYPES ================= */

type SectionType =
  | "RECTANGLE"
  | "CIRCLE"
  | "HOLLOW_CIRCLE"
  | "TRIANGLE"
  | "I_SECTION"
  | "T_SECTION"
  | "L_SECTION"
  | "CHANNEL_SECTION"
  | "COMPOSITE_RECTANGLE";

/* ================= PAGE ================= */

export default function SectionCalculator() {
  const { isPremium, user } = useAuth();

  const [type, setType] = useState<SectionType>("RECTANGLE");

  // Basic
  const [b, setB] = useState(200);
  const [h, setH] = useState(300);

  // Circle
  const [d, setD] = useState(200);

  // Hollow
  const [do_, setDo] = useState(200);
  const [di, setDi] = useState(120);

  // Sections
  const [tf, setTf] = useState(20);
  const [tw, setTw] = useState(12);

  // Composite rectangles
  const [b2, setB2] = useState(150);
  const [h2, setH2] = useState(150);

  /* ================= CALCULATIONS ================= */

  let A = 0,
    Ix = 0,
    Iy = 0,
    xbar = 0,
    ybar = 0;

  switch (type) {
    case "RECTANGLE":
      A = b * h;
      Ix = (b * h ** 3) / 12;
      Iy = (h * b ** 3) / 12;
      xbar = b / 2;
      ybar = h / 2;
      break;

    case "CIRCLE":
      A = (Math.PI * d ** 2) / 4;
      Ix = Iy = (Math.PI * d ** 4) / 64;
      xbar = ybar = d / 2;
      break;

    case "HOLLOW_CIRCLE":
      A = (Math.PI * (do_ ** 2 - di ** 2)) / 4;
      Ix = Iy = (Math.PI * (do_ ** 4 - di ** 4)) / 64;
      xbar = ybar = do_ / 2;
      break;

    case "TRIANGLE":
      A = (b * h) / 2;
      Ix = (b * h ** 3) / 36;
      Iy = (h * b ** 3) / 48;
      xbar = b / 2;
      ybar = h / 3;
      break;

    case "I_SECTION":
      A = 2 * b * tf + (h - 2 * tf) * tw;
      Ix =
        (b * h ** 3) / 12 -
        ((b - tw) * (h - 2 * tf) ** 3) / 12;
      Iy =
        (2 * tf * b ** 3) / 12 +
        ((h - 2 * tf) * tw ** 3) / 12;
      xbar = b / 2;
      ybar = h / 2;
      break;

    case "T_SECTION":
      A = b * tf + (h - tf) * tw;
      ybar =
        (b * tf * (h - tf / 2) +
          (h - tf) * tw * ((h - tf) / 2)) /
        A;
      Ix =
        (b * tf ** 3) / 12 +
        b * tf * (h - tf / 2 - ybar) ** 2 +
        (tw * (h - tf) ** 3) / 12 +
        tw * (h - tf) * ((h - tf) / 2 - ybar) ** 2;
      Iy =
        (tf * b ** 3) / 12 +
        ((h - tf) * tw ** 3) / 12;
      xbar = b / 2;
      break;

    case "L_SECTION":
      A = b * tf + (h - tf) * tw;
      xbar =
        (b * tf * (b / 2) +
          (h - tf) * tw * (tw / 2)) /
        A;
      ybar =
        (b * tf * (tf / 2) +
          (h - tf) * tw * ((h + tf) / 2)) /
        A;
      break;

    case "CHANNEL_SECTION":
      A = b * tf * 2 + (h - 2 * tf) * tw;
      xbar = (b + tw) / 2;
      ybar = h / 2;
      Ix =
        (b * tf ** 3) / 6 +
        b * tf * (h / 2 - tf / 2) ** 2 +
        (tw * (h - 2 * tf) ** 3) / 12;
      Iy =
        (2 * tf * b ** 3) / 12 +
        ((h - 2 * tf) * tw ** 3) / 12;
      break;

    case "COMPOSITE_RECTANGLE":
      const A1 = b * h;
      const A2 = b2 * h2;
      const y1 = h / 2;
      const y2 = h + h2 / 2;
      A = A1 + A2;
      ybar = (A1 * y1 + A2 * y2) / A;
      xbar = Math.max(b, b2) / 2;
      Ix =
        (b * h ** 3) / 12 +
        A1 * (y1 - ybar) ** 2 +
        (b2 * h2 ** 3) / 12 +
        A2 * (y2 - ybar) ** 2;
      Iy =
        (h * b ** 3) / 12 +
        (h2 * b2 ** 3) / 12;
      break;
  }

  const J = Ix + Iy;
  const rx = Math.sqrt(Ix / A);
  const ry = Math.sqrt(Iy / A);
  const Zx = Ix / Math.max(ybar, h - ybar);
  const Zy = Iy / Math.max(xbar, b - xbar);

  /* ================= AI INTERPRETATION ================= */

  let aiVerdict = "GOOD";
  let aiColor = "#16a34a";

  if (rx < 20 || ry < 20) {
    aiVerdict = "WEAK (Buckling Prone)";
    aiColor = "#dc2626";
  } else if (rx < 40 || ry < 40) {
    aiVerdict = "MODERATE";
    aiColor = "#f59e0b";
  }

  const aiStepExplanation = `
1. Area is calculated using standard geometric relations.
2. Centroid location is found using symmetry or first moment of area.
3. Moment of inertia is calculated about centroidal axes.
4. Radius of gyration indicates buckling resistance.
5. Section modulus governs bending strength.
`;

  const aiExamExplanation = `
Given the cross-section, centroid and moments of inertia are computed.
Section modulus determines bending capacity.
Radius of gyration indicates column behavior.
`;

  const aiIndustryInsight = `
• Higher Ix direction should resist bending
• Larger rx, ry improves buckling resistance
• I-sections are efficient in bending
`;

  /* ================= UI ================= */

  return (
    <>
      <Navbar />
      <main style={page}>
        <h1 style={title}>Section Properties Calculator</h1>
        <p style={subtitle}>
          Industry & academic centroid and inertia calculations
        </p>

        {/* INPUT */}
        {/* (UNCHANGED – YOUR CODE) */}

        {/* RESULTS */}
        {/* (UNCHANGED – YOUR CODE) */}

        {/* ================= AI PANEL ================= */}
        <section style={{ ...card, marginTop: 24 }}>
          <h2>AI Section Design Verdict</h2>
          <p style={{ fontWeight: 700, color: aiColor }}>
            Verdict: {aiVerdict}
          </p>

          <h3>AI Step-by-Step Explanation</h3>
          <pre>{aiStepExplanation}</pre>

          <h3>AI Exam Mode Explanation</h3>
          <pre>{aiExamExplanation}</pre>

          <h3>AI Industry Insights</h3>
          <p>{aiIndustryInsight}</p>
        </section>

        {/* PREMIUM */}
        {isPremium ? (
          <div style={{ ...card, marginTop: 24 }}>
            <button
              style={btn}
              onClick={() => {
                generatePDF({
                  title: "Section Properties Report",
                  inputs: { type, b, h, d, do_, di, tf, tw, b2, h2 },
                  results: { A, xbar, ybar, Ix, Iy, J, rx, ry, Zx, Zy },
                });

                if (user) {
                  saveHistory({
                    userId: user.id,
                    calculator: "section",
                    inputs: { type },
                    results: { A, xbar, ybar, Ix, Iy, J, rx, ry, Zx, Zy },
                  });
                }
              }}
            >
              Download PDF & Save History
            </button>
          </div>
        ) : (
          <div style={{ ...card, marginTop: 24, background: "#fff8f1" }}>
            🔒 PDF report, history & composite sections are premium only.
            <br />
            <Link href="/pricing" style={btn}>
              Unlock Premium
            </Link>
          </div>
        )}
      </main>
    </>
  );
}

/* ================= INPUT ================= */

function Input({
  label,
  value,
  set,
}: {
  label: string;
  value: number;
  set: (v: number) => void;
}) {
  return (
    <>
      <label style={labelStyle}>{label}</label>
      <input
        style={input}
        type="number"
        value={value}
        onChange={(e) => set(+e.target.value)}
      />
    </>
  );
}

/* ================= STYLES ================= */

const page = {
  maxWidth: 1100,
  margin: "auto",
  padding: "40px 20px",
};

const title = {
  fontSize: 34,
  fontWeight: 800,
};

const subtitle = {
  marginBottom: 24,
  color: "#6b7280",
};

const card = {
  background: "#fff",
  padding: 28,
  borderRadius: 14,
  boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
};

const label = { fontWeight: 600 };

const labelStyle = {
  display: "block",
  marginTop: 16,
  marginBottom: 6,
};

const input = {
  width: "100%",
  padding: "10px",
  borderRadius: 8,
  border: "1px solid #d1d5db",
};

const btn = {
  display: "inline-block",
  marginTop: 12,
  background: "#2563eb",
  color: "#fff",
  padding: "10px 18px",
  borderRadius: 8,
  textDecoration: "none",
};
