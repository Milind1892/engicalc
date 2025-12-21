import { useState } from "react";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import { useAuth } from "../../context/AuthContext";
import { generatePDF } from "../../utils/generatePDF";
import { saveHistory } from "../../utils/saveHistory";

/* ================= TYPES ================= */

type TorsionCase =
  | "SOLID_SHAFT"
  | "HOLLOW_SHAFT"
  | "POWER_TRANSMISSION"
  | "COMPOSITE_SHAFT";

/* ================= PAGE ================= */

export default function TorsionCalculator() {
  const { isPremium, user } = useAuth();

  const [caseType, setCaseType] = useState<TorsionCase>("SOLID_SHAFT");

  // Common
  const [T, setT] = useState(5); // kNm
  const [L, setL] = useState(2); // m
  const [G, setG] = useState(80); // GPa
  const [tauAllow, setTauAllow] = useState(80); // MPa

  // Diameters
  const [d, setD] = useState(50);
  const [do_, setDo] = useState(60);
  const [di, setDi] = useState(30);

  // Power transmission
  const [P, setP] = useState(15);
  const [N, setN] = useState(300);

  /* ================= CALCULATIONS ================= */

  let tau = 0;
  let theta = 0;
  let J = 0;
  let torqueNm = T * 1000;
  let info = "";

  if (caseType === "SOLID_SHAFT") {
    J = (Math.PI * d ** 4) / 32;
    tau = (T * 1e6 * (d / 2)) / J;
    theta = (T * 1e6 * L * 1000) / (G * 1000 * J);
  }

  if (caseType === "HOLLOW_SHAFT") {
    J = (Math.PI * (do_ ** 4 - di ** 4)) / 32;
    tau = (T * 1e6 * (do_ / 2)) / J;
    theta = (T * 1e6 * L * 1000) / (G * 1000 * J);
  }

  if (caseType === "POWER_TRANSMISSION") {
    torqueNm = (9550 * P) / N;
    J = (Math.PI * d ** 4) / 32;
    tau = (torqueNm * 1000 * (d / 2)) / J;
    theta = (torqueNm * 1000 * L * 1000) / (G * 1000 * J);
    info = `Torque from power = ${torqueNm.toFixed(2)} Nm`;
  }

  if (caseType === "COMPOSITE_SHAFT") {
    J = (Math.PI * d ** 4) / 32;
    tau = (T * 1e6 * (d / 2)) / J;
    theta = (T * 1e6 * L * 1000) / (G * 1000 * J);
    info =
      "Composite shaft assumes same material properties (intro + academic model)";
  }

  const thetaDeg = theta * (180 / Math.PI);
  const fos = tauAllow / tau;
  const utilization = (tau / tauAllow) * 100;
  const unsafe = tau > tauAllow;
  const twistLimitExceeded = thetaDeg > 1;

  /* =====================================================
     AI INTERPRETATION LAYER (SAFE, READ-ONLY)
     ===================================================== */

  let aiVerdict: "SAFE" | "CAUTION" | "UNSAFE" = "SAFE";
  let aiColor = "#16a34a";
  const aiReasons: string[] = [];

  if (unsafe || fos < 1.2) {
    aiVerdict = "UNSAFE";
    aiColor = "#dc2626";
    aiReasons.push(
      "Maximum shear stress exceeds allowable design stress."
    );
  } else if (fos < 2 || twistLimitExceeded) {
    aiVerdict = "CAUTION";
    aiColor = "#f59e0b";
    aiReasons.push(
      "Shaft is safe in strength but stiffness or safety margin is low."
    );
  } else {
    aiReasons.push(
      "Shaft is safe against torsional failure with adequate safety margin."
    );
  }

  const aiStepExplanation = `
1. Identify applied torque on the shaft.
2. Compute polar moment of inertia based on shaft geometry.
3. Calculate maximum shear stress using τ = T·r / J.
4. Calculate angle of twist using θ = TL / GJ.
5. Compare stress and twist with allowable limits.
`;

  const aiExamAnswer = `
Given a circular shaft subjected to torsion,
the induced shear stress is calculated using torsion theory.
The angle of twist is checked for serviceability.
The shaft design is found to be ${aiVerdict.toLowerCase()}.
`;

  const aiVoiceText = `
The shaft is subjected to torsional loading.
The calculated shear stress and angle of twist are evaluated.
Based on design limits, the shaft is ${aiVerdict}.
`;

  /* ================= UI ================= */

  return (
    <>
      <Navbar />

      <main style={page}>
        <h1 style={title}>Torsion Calculator</h1>
        <p style={subtitle}>
          Industry-grade torsional stress & shaft design analysis
        </p>

        {/* INPUT */}
        <div style={card}>
          <label style={label}>Torsion Case</label>
          <select
            style={input}
            value={caseType}
            onChange={(e) =>
              setCaseType(e.target.value as TorsionCase)
            }
          >
            <option value="SOLID_SHAFT">Solid Circular Shaft</option>
            <option value="HOLLOW_SHAFT">Hollow Circular Shaft</option>
            <option value="POWER_TRANSMISSION">Power Transmission</option>
            <option value="COMPOSITE_SHAFT">Composite Shaft</option>
          </select>

          <Input label="Length L (m)" value={L} set={setL} />
          <Input label="Shear Modulus G (GPa)" value={G} set={setG} />
          <Input
            label="Allowable Shear Stress (MPa)"
            value={tauAllow}
            set={setTauAllow}
          />

          {(caseType === "SOLID_SHAFT" ||
            caseType === "POWER_TRANSMISSION" ||
            caseType === "COMPOSITE_SHAFT") && (
            <Input label="Diameter d (mm)" value={d} set={setD} />
          )}

          {caseType === "HOLLOW_SHAFT" && (
            <>
              <Input label="Outer Diameter (mm)" value={do_} set={setDo} />
              <Input label="Inner Diameter (mm)" value={di} set={setDi} />
            </>
          )}

          {caseType !== "POWER_TRANSMISSION" && (
            <Input label="Torque T (kNm)" value={T} set={setT} />
          )}

          {caseType === "POWER_TRANSMISSION" && (
            <>
              <Input label="Power P (kW)" value={P} set={setP} />
              <Input label="Speed N (rpm)" value={N} set={setN} />
            </>
          )}
        </div>

        {/* RESULTS */}
        <div style={{ ...card, marginTop: 24 }}>
          <h2>Results</h2>
          {info && <p style={{ color: "#6b7280" }}>{info}</p>}
          <p><strong>Max Shear Stress τ:</strong> {tau.toFixed(2)} MPa</p>
          <p><strong>Angle of Twist:</strong> {thetaDeg.toFixed(3)}°</p>
          <p><strong>Factor of Safety:</strong> {fos.toFixed(2)}</p>
          <p><strong>Stress Utilization:</strong> {utilization.toFixed(1)}%</p>
        </div>

        {/* ================= AI PANEL ================= */}
        <section style={{ ...card, marginTop: 24 }}>
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

          <h3>AI Exam Mode Explanation</h3>
          <pre>{aiExamAnswer}</pre>

          <h3>AI Voice Explanation (Text)</h3>
          <p>{aiVoiceText}</p>
        </section>

        {/* PREMIUM */}
        {isPremium ? (
          <div style={{ ...card, marginTop: 24 }}>
            <button
              style={btn}
              onClick={() => {
                generatePDF({
                  title: "Torsion Calculation Report",
                  inputs: { caseType, T, L, G, d, do_, di, P, N },
                  results: { tau, thetaDeg, fos, utilization },
                });

                if (user) {
                  saveHistory({
                    userId: user.id,
                    calculator: "torsion",
                    inputs: { caseType },
                    results: { tau, thetaDeg, fos, utilization },
                  });
                }
              }}
            >
              Download PDF & Save History
            </button>
          </div>
        ) : (
          <div style={{ ...card, marginTop: 24, background: "#fff8f1" }}>
            🔒 PDF report, safety checks & history are premium only.
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
  display: "inline-block",
  marginTop: 12,
  background: "#2563eb",
  color: "#fff",
  padding: "10px 18px",
  borderRadius: 8,
  textDecoration: "none",
};
