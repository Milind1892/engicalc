import Head from "next/head";
import Link from "next/link";
import Navbar from "../components/Navbar";

export default function StressCalculatorSEO() {
  return (
    <>
      <Head>
        <title>
          Stress Calculator | Normal, Shear & Bending Stress
        </title>

        <meta
          name="description"
          content="Stress Calculator for engineering students. Calculate normal stress, shear stress and bending stress using standard formulas."
        />

        <meta
          name="keywords"
          content="
            stress calculator,
            normal stress calculator,
            shear stress calculator,
            bending stress calculator,
            strength of materials calculator,
            mechanical engineering stress calculator
          "
        />

        <meta name="robots" content="index, follow" />
        <meta name="author" content="EngiCalc" />

        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_APP_URL}/stress-calculator`}
        />
      </Head>

      <Navbar />

      <main className="page">
        <h1 className="section-title">
          Stress Calculator
        </h1>

        <section className="card">
          <p>
            This <strong>Stress Calculator</strong> helps engineering students
            calculate <b>normal stress</b>, <b>shear stress</b> and
            <b> bending stress</b> using standard strength of materials formulas.
          </p>
        </section>

        <section className="card">
          <h2>Stress Formula</h2>
          <p><strong>σ = F / A</strong></p>
          <ul>
            <li>σ = Stress</li>
            <li>F = Force</li>
            <li>A = Area</li>
          </ul>
        </section>

        <section className="card">
          <h2>Types of Stress</h2>
          <ul>
            <li>Normal Stress</li>
            <li>Shear Stress</li>
            <li>Bending Stress</li>
          </ul>
        </section>

        <section className="card">
          <h2>Related Engineering Calculators</h2>
          <ul>
            <li>
              <Link href="/beam-calculator">
                Beam Calculator
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

        <section className="card center">
          <h2>Access Advanced Stress Calculations</h2>
          <p>Premium users get full access to detailed stress analysis.</p>
          <Link href="/pricing" className="btn-primary">
            Upgrade to Premium
          </Link>
        </section>
      </main>
    </>
  );
}
