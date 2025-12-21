import { useRouter } from "next/router";
import { useAuth } from "../../context/AuthContext";

export default function DynamicCalculator() {
  const router = useRouter();
  const { id } = router.query;
  const { isPremium } = useAuth();

  // Convert ID to nice title
  const title = String(id || "").charAt(0).toUpperCase() + String(id || "").slice(1);

  if (!id) return <p>Loading...</p>;

  // Premium Lock (everything except Beam can also be locked)
  if (!isPremium) {
    return (
      <div className="container">
        <h1>{title} Calculator</h1>
        <p>This calculator is available only for premium users.</p>

        <a href="/subscribe" className="btn">
          Unlock Premium
        </a>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>{title} Calculator</h1>

      <div className="card">
        <p>This calculator is not fully built yet.</p>
        <p>
          You can ask ChatGPT to add more calculators like:  
          <strong> Torque • Stress • Deflection • Pressure • Material Weight • Thermal</strong>
        </p>
      </div>
    </div>
  );
}
