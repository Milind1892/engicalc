import { useState } from "react";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import { useAuth } from "../../context/AuthContext";
import { generatePDF } from "../../utils/generatePDF";
import { saveHistory } from "../../utils/saveHistory";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

/* ================= TYPES ================= */

type StressCase =
  | "DIRECT"
  | "SHEAR"
  | "BENDING"
  | "TORSION"
  | "THERMAL"
  | "COMBINED";

/* ================= PAGE ================= */

export default function StressCalculator() {
  const { isPremium, user } = useAuth();

  const [caseType, setCaseType] = useState<StressCase>("DIRECT");

  // Common
  const [force, setForce] = useState(100);
  const [area, setArea] = useState(1000);

  // Bending
  const [moment, setMoment] = useState(10);
  const [y, setY] = useState(50);
  const [I, setI] = useState(8e6);

  // Torsion
  const [torque, setTorque] = useState(5);
  const [radius, setRadius] = useState(25);
  const [J, setJ] = useState(1.6e6);

  // Thermal
  const [alpha, setAlpha] = useState(12e-6);
  const [deltaT, setDeltaT] = useState(50);
  const [E, setE] = useState(200);

  // Combined
  const [sigma, setSigma] = useState(100);
  const [tau, setTau] = useState(50);
  const [yieldStress, setYieldStress] = useState(250);

  /* ================= CALCULATIONS ================= */

  let result = "";
  let extra = "";
  let resultsObject: any = {};

  let sigma1 = 0;
  let sigma2 = 0;
  let vonMises = 0;
  let tresca = 0;
  let fosVM = 0;
  let fosTresca = 0;
  let fosRankine = 0;

  switch (caseType) {
    case "DIRECT":
    case "SHEAR": {
      const stress = (force * 1000) / area;
      result = stress.toFixed(2) + " MPa";
      resultsObject = { stress };
      break;
    }

    case "BENDING": {
      const bendingStress = (moment * 1e6 * y) / I;
      result = bendingStress.toFixed(2) + " MPa";
      resultsObject = { bendingStress };
      break;
    }

    case "TORSION": {
      const torsionalStress = (torque * 1e6 * radius) / J;
      result = torsionalStress.toFixed(2) + " MPa";
      resultsObject = { torsionalStress };
      break;
    }

    case "THERMAL": {
      const thermalStress = E * 1000 * alpha * deltaT;
      result = thermalStress.toFixed(2) + " MPa";
      resultsObject = { thermalStress };
      break;
    }

    case "COMBINED": {
      sigma1 =
        sigma / 2 + Math.sqrt((sigma / 2) ** 2 + tau ** 2);
      sigma2 =
        sigma / 2 - Math.sqrt((sigma / 2) ** 2 + tau ** 2);

      vonMises = Math.sqrt(sigma ** 2 + 3 * tau ** 2);
      tresca = Math.abs(sigma1 - sigma2);

      fosVM = yieldStress / vonMises;
      fosTresca = yieldStress / tresca;
      fosRankine =
        yieldStress /
        Math.max(Math.abs(sigma1), Math.abs(sigma2));

      result = `σ₁ = ${sigma1.toFixed(
        2
      )} MPa , σ₂ = ${sigma2.toFixed(2)} MPa`;
      extra = `Von Mises = ${vonMises.toFixed(2)} MPa`;

      resultsObject = {
        sigma1,
        sigma2,
        vonMises,
        tresca,
        fosVM,
        fosTresca,
        fosRankine,
      };
      break;
    }
  }

  /* ================= MOHR CIRCLE DATA ================= */

  const mohrData =
    caseType === "COMBINED"
      ? Array.from({ length: 120 }, (_, i) => {
          const theta = (2 * Math.PI * i) / 120;
          const center = (sigma1 + sigma2) / 2;
          const radius = (sigma1 - sigma2) / 2;
          return {
            x: center + radius * Math.cos(theta),
            y: radius * Math.sin(theta),
          };
        })
      : [];

  /* =====================================================
     AI INTERPRETATION LAYER (READ-ONLY, SAFE)
     ===================================================== */

  let aiVerdict: "SAFE" | "CAUTION" | "UNSAFE" = "SAFE";
  let aiColor = "#16a34a";
  const aiReasons: string[] = [];

  if (caseType === "COMBINED") {
    if (fosVM < 1.2 || fosTresca < 1.2) {
      aiVerdict = "UNSAFE";
      aiColor = "#dc2626";
      aiReasons.push(
        "Factor of safety against yielding is below acceptable limits."
      );
    } else if (fosVM < 2 || fosTresca < 2) {
      aiVerdict = "CAUTION";
      aiColor = "#f59e0b";
      aiReasons.push(
        "Stress levels are approaching yield limits under combined loading."
      );
    } else {
      aiReasons.push(
        "Stress state is well within elastic limits for ductile materials."
      );
    }
  }

  const aiStepExplanation = `
1. Identify the stress components acting on the element.
2. Compute principal stresses using Mohr’s circle relations.
3. Evaluate equivalent stress using Von Mises and Tresca criteria.
4. Compare against yield stress to obtain factor of safety.
`;

  const aiExamAnswer = `
Given the state of stress, principal stresses are calculated.
Failure theories are applied.
The design is checked against yielding criteria.
Hence, the structure is ${aiVerdict.toLowerCase()}.
`;

  const aiVoiceText = `
The combined stress analysis shows that the design is ${aiVerdict}.
The governing criterion is based on failure theories.
`;

  /* ================= UI ================= */

  return (
    <>
      <Navbar />

      <main style={page}>
        <h1 style={title}>Stress Calculator</h1>
        <p style={subtitle}>
          Industry-grade stress analysis with Mohr’s Circle & failure theories
        </p>

        {/* INPUT */}
        <div style={card}>
          <label style={label}>Stress Type</label>
          <select
            style={input}
            value={caseType}
            onChange={(e) =>
              setCaseType(e.target.value as StressCase)
            }
          >
            <option value="DIRECT">Direct Stress</option>
            <option value="SHEAR">Shear Stress</option>
            <option value="BENDING">Bending Stress</option>
            <option value="TORSION">Torsional Stress</option>
            <option value="THERMAL">Thermal Stress</option>
            <option value="COMBINED">Combined Stress</option>
          </select>

          {(caseType === "DIRECT" || caseType === "SHEAR") && (
            <>
              <Input label="Force (kN)" value={force} set={setForce} />
              <Input label="Area (mm²)" value={area} set={setArea} />
            </>
          )}

          {caseType === "COMBINED" && (
            <>
              <Input label="Normal Stress σ (MPa)" value={sigma} set={setSigma} />
              <Input label="Shear Stress τ (MPa)" value={tau} set={setTau} />
              <Input
                label="Yield Stress (MPa)"
                value={yieldStress}
                set={setYieldStress}
              />
            </>
          )}
        </div>

        {/* RESULTS */}
        <div style={{ ...card, marginTop: 24 }}>
          <h2>Results</h2>
          <p><strong>{result}</strong></p>
          {extra && <p>{extra}</p>}
        </div>

        {/* AI PANEL */}
        {caseType === "COMBINED" && (
          <div style={{ ...card, marginTop: 24 }}>
            <h2>AI Design Safety Verdict</h2>
            <p style={{ fontWeight: 700, color: aiColor }}>
              Verdict: {aiVerdict}
            </p>
            <ul>
              {aiReasons.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>

            <h3>AI Step-by-Step Explanation</h3>
            <pre>{aiStepExplanation}</pre>

            <h3>AI Exam Mode Answer</h3>
            <pre>{aiExamAnswer}</pre>

            <h3>AI Voice Explanation (Text)</h3>
            <p>{aiVoiceText}</p>
          </div>
        )}

        {/* MOHR CIRCLE */}
        {caseType === "COMBINED" && (
          <div style={{ ...card, marginTop: 24 }}>
            <h2>Mohr’s Circle</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={mohrData}>
                <CartesianGrid />
                <XAxis />
                <YAxis />
                <Tooltip />
                <Line dataKey="y" stroke="#2563eb" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* FAILURE THEORIES */}
        {caseType === "COMBINED" && (
          <div style={{ ...card, marginTop: 24 }}>
            <h2>Failure Theories</h2>
            <p>Von Mises FOS: {fosVM.toFixed(2)}</p>
            <p>Tresca FOS: {fosTresca.toFixed(2)}</p>
            <p>Rankine FOS: {fosRankine.toFixed(2)}</p>
          </div>
        )}

        {/* PREMIUM ACTION */}
        {isPremium ? (
          <div style={{ ...card, marginTop: 24 }}>
            <button
              style={btn}
              onClick={() => {
                generatePDF({
                  title: "Stress Calculation Report",
                  inputs: { caseType, force, area, sigma, tau },
                  results: resultsObject,
                });

                if (user) {
                  saveHistory({
                    userId: user.id,
                    calculator: "stress",
                    inputs: { caseType },
                    results: resultsObject,
                  });
                }
              }}
            >
              Download PDF & Save History
            </button>
          </div>
        ) : (
          <div style={{ ...card, marginTop: 24, background: "#fff8f1" }}>
            🔒 Mohr’s Circle, failure theories & reports are premium only.
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

function Input({ label, value, set }: any) {
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

const page = { maxWidth: 1100, margin: "auto", padding: "40px 20px" };
const title = { fontSize: 34, fontWeight: 800 };
const subtitle = { marginBottom: 24, color: "#6b7280" };
const card = {
  background: "#fff",
  padding: 28,
  borderRadius: 14,
  boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
};
const label = { fontWeight: 600 };
const labelStyle = { display: "block", marginTop: 16, marginBottom: 6 };
const input = {
  width: "100%",
  padding: "10px",
  borderRadius: 8,
  border: "1px solid #d1d5db",
};
const btn = {
  marginTop: 16,
  background: "#2563eb",
  color: "#fff",
  padding: "10px 18px",
  borderRadius: 8,
  border: "none",
  cursor: "pointer",
};
