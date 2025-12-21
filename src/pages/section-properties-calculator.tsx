import Head from "next/head";
import Link from "next/link";
import Navbar from "../components/Navbar";

export default function SectionPropertiesSEO() {
  return (
    <>
      <Head>
        <title>
          Section Properties Calculator | Moment of Inertia & Centroid
        </title>

        <meta
          name="description"
          content="Section Properties Calculator for engineering students. Calculate moment of inertia, centroid and section modulus for common cross-sections."
        />

        <meta
          name="keywords"
          content="
            section properties calculator,
            moment of inertia calculator,
            centroid calculator,
            section modulus calculator,
            civil engineering calculator,
            mechanical engineering section calculator
          "
        />

        <meta name="robots" content="index, follow" />
        <meta name="author" content="EngiCalc" />

        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_APP_URL}/section-properties-calculator`}
        />
      </Head>

      <Navbar />

      <main className="page">
        <h1 className="section-title">
          Section Properties Calculator
        </h1>

        <section className="card">
          <p>
            This <strong>Section Properties Calculator</strong> helps engineering
            students calculate <b>moment of inertia</b>, <b>centroid</b> and
            <b> section modulus</b> for standard cross-sections used in
            structural and mechanical design.
          </p>
        </section>

        <section className="card">
          <h2>Supported Cross Sections</h2>
          <ul>
            <li>Rectangle</li>
            <li>Circle</li>
            <li>I-Section</li>
            <li>T-Section</li>
            <li>Composite Sections</li>
          </ul>
        </section>

        <section className="card">
          <h2>Moment of Inertia Formula</h2>
          <p><strong>I = ∫y² dA</strong></p>
          <p>
            Moment of inertia measures resistance of a section against bending.
          </p>
        </section>

        <section className="card">
          <h2>Related Engineering Calculators</h2>
          <ul>
            <li>
              <Link href="/beam-calculator">
                Beam Calculator – Bending & Deflection
              </Link>
            </li>
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
          </ul>
        </section>

        <section className="card center">
          <h2>Unlock Full Section Calculations</h2>
          <p>Advanced section property calculations are available for premium users.</p>
          <Link href="/pricing" className="btn-primary">
            View Pricing
          </Link>
        </section>
      </main>
    </>
  );
}
