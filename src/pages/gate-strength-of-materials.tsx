import Head from "next/head";
import Link from "next/link";
import Navbar from "../components/Navbar";

export default function GateSOM() {
  return (
    <>
      <Head>
        <title>
          GATE Strength of Materials Calculator | Beam, Stress, Torsion
        </title>
        <meta
          name="description"
          content="Solve GATE Strength of Materials numericals using professional beam, stress and torsion calculators. Save time and avoid mistakes."
        />
        <meta name="robots" content="index, follow" />
      </Head>

      <Navbar />

      <main className="page">
        <h1 className="section-title">
          GATE Strength of Materials Calculator
        </h1>

        <section className="card">
          <p>
            EngiCalc is designed for <b>serious GATE aspirants</b> and
            final-year engineering students who want accurate results
            without manual calculation errors.
          </p>
        </section>

        <section className="card">
          <h2>What You Can Solve</h2>
          <ul>
            <li>Beam bending & shear force numericals</li>
            <li>Stress & strain problems</li>
            <li>Torsion of shafts</li>
            <li>Section properties</li>
          </ul>
        </section>

        <section className="card">
          <h2>Why Serious Students Use EngiCalc</h2>
          <ul>
            <li>✔ Eliminates calculation mistakes</li>
            <li>✔ Saves time during practice</li>
            <li>✔ Matches exam-level accuracy</li>
            <li>✔ Useful for projects & viva</li>
          </ul>
        </section>

        <section className="card center">
          <h2>Start with Weekly Access</h2>
          <p>
            Try all professional calculators for <b>₹999 / week</b>.
            Upgrade anytime to monthly or yearly access.
          </p>

          <Link href="/pricing" className="btn-primary">
            Get Weekly Access
          </Link>
        </section>
      </main>
    </>
  );
}
