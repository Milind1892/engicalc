import Head from "next/head";
import Link from "next/link";
import Navbar from "../components/Navbar";

export default function TorsionCalculatorSEO() {
  return (
    <>
      <Head>
        <title>
          Torsion Calculator | Shaft Torsion & Shear Stress
        </title>

        <meta
          name="description"
          content="Torsion Calculator for shafts. Calculate shear stress, angle of twist and torque using torsion formulas."
        />

        <meta
          name="keywords"
          content="
            torsion calculator,
            shaft torsion calculator,
            angle of twist calculator,
            shear stress torsion,
            mechanical engineering torsion calculator
          "
        />

        <meta name="robots" content="index, follow" />
        <meta name="author" content="EngiCalc" />

        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_APP_URL}/torsion-calculator`}
        />
      </Head>

      <Navbar />

      <main className="page">
        <h1 className="section-title">
          Torsion Calculator
        </h1>

        <section className="card">
          <p>
            This <strong>Torsion Calculator</strong> helps engineering students
            calculate <b>shear stress</b>, <b>angle of twist</b> and
            <b> torque</b> in circular shafts.
          </p>
        </section>

        <section className="card">
          <h2>Torsion Formula</h2>
          <p><strong>τ = T × r / J</strong></p>
          <ul>
            <li>T = Torque</li>
            <li>r = Radius</li>
            <li>J = Polar Moment of Inertia</li>
          </ul>
        </section>

        <section className="card">
          <h2>Applications</h2>
          <ul>
            <li>Power transmission shafts</li>
            <li>Mechanical components</li>
            <li>Strength of materials problems</li>
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
              <Link href="/stress-calculator">
                Stress Calculator
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
          <h2>Unlock Full Torsion Analysis</h2>
          <p>Advanced torsion calculations are available for premium users.</p>
          <Link href="/pricing" className="btn-primary">
            Unlock Premium
          </Link>
        </section>
      </main>
    </>
  );
}
