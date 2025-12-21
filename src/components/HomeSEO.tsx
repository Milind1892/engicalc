import Head from "next/head";
import Link from "next/link";

export default function HomeSEO() {
  return (
    <>
      {/* ================= SEO META ================= */}
      <Head>
        <title>
          Engineering Calculators Online | Beam, Stress, Torsion – EngiCalc
        </title>

        <meta
          name="description"
          content="EngiCalc provides professional engineering calculators including beam calculator, stress calculator, torsion calculator and section properties calculator for students and engineers."
        />

        <meta
          name="keywords"
          content="
            engineering calculators,
            beam calculator,
            stress calculator,
            torsion calculator,
            section properties calculator,
            civil engineering calculators,
            mechanical engineering calculators,
            engineering tools for students
          "
        />

        <meta name="robots" content="index, follow" />
        <meta name="author" content="EngiCalc" />

        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_APP_URL}/`}
        />
      </Head>

      {/* ================= HERO ================= */}
      <section className="card center">
        <h1 className="section-title">
          Engineering Calculators for Students & Professionals
        </h1>

        <p className="small">
          Accurate, fast and exam-ready engineering calculators for
          civil and mechanical engineering students.
        </p>

        <Link href="/pricing" className="btn-primary">
          View Pricing
        </Link>
      </section>

      {/* ================= PRIMARY INTERNAL LINKS ================= */}
      <section className="card">
        <h2>Engineering Calculators</h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 16,
            marginTop: 16,
          }}
        >
          <Link href="/beam-calculator">
            Beam Calculator – Shear Force & Bending Moment
          </Link>

          <Link href="/stress-calculator">
            Stress Calculator for Engineering Students
          </Link>

          <Link href="/torsion-calculator">
            Torsion Calculator for Shafts
          </Link>

          <Link href="/section-properties-calculator">
            Section Properties Calculator
          </Link>
        </div>
      </section>

      {/* ================= CONTEXTUAL SEO LINKS ================= */}
      <section className="card">
        <p>
          EngiCalc offers professional tools such as the{" "}
          <Link href="/beam-calculator">beam calculator</Link>,{" "}
          <Link href="/stress-calculator">stress calculator</Link>,{" "}
          <Link href="/torsion-calculator">torsion calculator</Link>{" "}
          and{" "}
          <Link href="/section-properties-calculator">
            section properties calculator
          </Link>{" "}
          designed for civil and mechanical engineering students preparing
          for university and competitive exams like GATE.
        </p>
      </section>

      {/* ================= MOST POPULAR ================= */}
      <section className="card">
        <h2>Most Used Calculators</h2>

        <ul>
          <li>
            <Link href="/beam-calculator">
              Beam Calculator – Simply Supported & Cantilever Beams
            </Link>
          </li>

          <li>
            <Link href="/stress-calculator">
              Stress Calculator – Normal & Shear Stress
            </Link>
          </li>
        </ul>
      </section>

      {/* ================= CONVERSION CTA ================= */}
      <section className="card center">
        <h2>Unlock All Engineering Calculators</h2>

        <p>
          Get unlimited access to all calculators including beam, stress,
          torsion and section analysis with a premium plan.
        </p>

        <Link href="/pricing" className="btn-primary">
          Upgrade to Premium
        </Link>
      </section>
    </>
  );
}
